import { useState, useEffect, useCallback } from "react";
import { Difficulty } from "@/components/DifficultySelector";
import { LeaderboardEntry } from "@/components/Leaderboard";
import { getRandomWord } from "@/data/keywords";
import { useToast } from "@/hooks/use-toast";

interface GameStats {
  wordsTyped: number;
  correctWords: number;
  totalTime: number;
  startTime: number | null;
}

export const useGameState = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentWord, setCurrentWord] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [stats, setStats] = useState<GameStats>({
    wordsTyped: 0,
    correctWords: 0,
    totalTime: 0,
    startTime: null,
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { toast } = useToast();

  // Load leaderboard from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("codepulse-leaderboard");
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      }
    }
  }, []);

  // Save leaderboard to localStorage
  const saveLeaderboard = useCallback((entries: LeaderboardEntry[]) => {
    const sorted = entries.sort((a, b) => b.score - a.score);
    localStorage.setItem("codepulse-leaderboard", JSON.stringify(sorted));
    setLeaderboard(sorted);
  }, []);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft]);

  const calculateWPM = useCallback(() => {
    if (!stats.startTime || stats.totalTime === 0) return 0;
    const minutes = stats.totalTime / 60000; // Convert ms to minutes
    return Math.round(stats.correctWords / minutes);
  }, [stats]);

  const calculateAccuracy = useCallback(() => {
    if (stats.wordsTyped === 0) return 100;
    return Math.round((stats.correctWords / stats.wordsTyped) * 100);
  }, [stats]);

  const calculateScore = useCallback(() => {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 }[difficulty];
    return Math.round(wpm * accuracy * difficultyMultiplier);
  }, [calculateWPM, calculateAccuracy, difficulty]);

  const startGame = useCallback(() => {
    setIsGameActive(true);
    setTimeLeft(60);
    setStats({
      wordsTyped: 0,
      correctWords: 0,
      totalTime: 0,
      startTime: Date.now(),
    });
    setCurrentWord(getRandomWord(difficulty));
  }, [difficulty]);

  const endGame = useCallback(() => {
    setIsGameActive(false);
    
    const finalWPM = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    const finalScore = calculateScore();
    
    if (stats.wordsTyped > 0) {
      const newEntry: LeaderboardEntry = {
        wpm: finalWPM,
        accuracy: finalAccuracy,
        difficulty,
        date: new Date().toISOString(),
        score: finalScore,
      };
      
      saveLeaderboard([...leaderboard, newEntry]);
      
      toast({
        title: "Game Complete!",
        description: `${finalWPM} WPM • ${finalAccuracy}% accuracy • Score: ${finalScore}`,
      });
    }
  }, [calculateWPM, calculateAccuracy, calculateScore, difficulty, leaderboard, saveLeaderboard, stats.wordsTyped, toast]);

  const handleWordComplete = useCallback((correct: boolean, timeMs: number) => {
    setStats((prev) => ({
      ...prev,
      wordsTyped: prev.wordsTyped + 1,
      correctWords: prev.correctWords + (correct ? 1 : 0),
      totalTime: prev.totalTime + timeMs,
    }));
    
    if (isGameActive) {
      setCurrentWord(getRandomWord(difficulty));
    }
  }, [difficulty, isGameActive]);

  const resetGame = useCallback(() => {
    setIsGameActive(false);
    setTimeLeft(60);
    setStats({
      wordsTyped: 0,
      correctWords: 0,
      totalTime: 0,
      startTime: null,
    });
    setCurrentWord(getRandomWord(difficulty));
  }, [difficulty]);

  // Initialize first word
  useEffect(() => {
    if (!currentWord) {
      setCurrentWord(getRandomWord(difficulty));
    }
  }, [difficulty, currentWord]);

  return {
    difficulty,
    setDifficulty,
    currentWord,
    isGameActive,
    timeLeft,
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    leaderboard,
    startGame,
    endGame,
    resetGame,
    handleWordComplete,
  };
};
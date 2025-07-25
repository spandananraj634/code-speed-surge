
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { GameHeader } from "@/components/GameHeader";
import { DifficultySelector } from "@/components/DifficultySelector";
import { TypingArea } from "@/components/TypingArea";
import { Leaderboard } from "@/components/Leaderboard";
import { useGameState } from "@/hooks/useGameState";

const Index = () => {
  const {
    difficulty,
    setDifficulty,
    currentWord,
    isGameActive,
    timeLeft,
    wpm,
    accuracy,
    leaderboard,
    startGame,
    resetGame,
    handleWordComplete,
  } = useGameState();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <GameHeader wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
        
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-code-primary/20">
              <CardContent className="space-y-6 p-0">
                <DifficultySelector
                  selectedDifficulty={difficulty}
                  onDifficultyChange={setDifficulty}
                  disabled={isGameActive}
                />
                
                <div className="flex justify-center">
                  {!isGameActive ? (
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-code-primary to-code-secondary hover:scale-105 transition-transform font-bold px-8 py-4 text-lg gap-3"
                    >
                      <Play className="w-5 h-5" />
                      Start Game
                    </Button>
                  ) : (
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      size="lg"
                      className="border-code-error text-code-error hover:bg-code-error/10 gap-3"
                    >
                      <Pause className="w-5 h-5" />
                      Stop Game
                    </Button>
                  )}
                </div>
                
                <TypingArea
                  currentWord={currentWord}
                  onWordComplete={handleWordComplete}
                  onRestart={resetGame}
                  isGameActive={isGameActive}
                />
              </CardContent>
            </Card>
            
            {/* Game Instructions */}
            <Card className="p-6 border-code-secondary/20">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-code-secondary rounded-full animate-pulse"></span>
                  How to Play
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">🎯 Objective</p>
                    <p>Type programming keywords as fast and accurately as possible to improve your coding speed.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">⚡ Scoring</p>
                    <p>Your score is calculated based on WPM × Accuracy × Difficulty multiplier.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">🏆 Levels</p>
                    <p>Easy: Basic keywords • Medium: OOP concepts • Hard: Advanced algorithms</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">📊 Stats</p>
                    <p>Track your Words Per Minute (WPM) and accuracy percentage in real-time.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

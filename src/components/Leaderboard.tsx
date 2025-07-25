import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Difficulty } from "./DifficultySelector";

export interface LeaderboardEntry {
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  date: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard = ({ entries }: LeaderboardProps) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-code-warning" />;
      case 1:
        return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 2:
        return <Award className="w-5 h-5 text-code-error" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-code-success";
      case "medium":
        return "bg-code-warning";
      case "hard":
        return "bg-code-error";
    }
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-code-warning" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No scores yet. Start typing to set your first record!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-code-warning" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.slice(0, 10).map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center justify-center w-8">
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-mono font-bold text-code-primary">{entry.wpm} WPM</div>
                <div className="text-xs text-muted-foreground">Speed</div>
              </div>
              <div>
                <div className="font-mono font-bold text-code-secondary">{entry.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="font-mono font-bold">{entry.score}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <Badge className={`${getDifficultyColor(entry.difficulty)} text-xs`}>
                {entry.difficulty.toUpperCase()}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {new Date(entry.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
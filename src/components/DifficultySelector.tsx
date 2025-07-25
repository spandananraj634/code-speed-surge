import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    description: "Basic keywords",
    color: "bg-code-success",
  },
  medium: {
    label: "Medium", 
    description: "OOP concepts",
    color: "bg-code-warning",
  },
  hard: {
    label: "Hard",
    description: "Advanced terms",
    color: "bg-code-error",
  },
};

export const DifficultySelector = ({ 
  selectedDifficulty, 
  onDifficultyChange, 
  disabled = false 
}: DifficultySelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Select Difficulty</h3>
      <div className="flex gap-4 justify-center">
        {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty) => {
          const config = difficultyConfig[difficulty];
          const isSelected = selectedDifficulty === difficulty;
          
          return (
            <Button
              key={difficulty}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => onDifficultyChange(difficulty)}
              disabled={disabled}
              className={`relative flex flex-col gap-2 h-auto py-4 px-6 ${
                isSelected 
                  ? "bg-gradient-to-r from-code-primary to-code-secondary animate-pulse-glow" 
                  : "hover:border-code-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className="font-semibold">{config.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {config.description}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
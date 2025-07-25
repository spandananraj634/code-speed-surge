import { Code, Zap } from "lucide-react";

interface GameHeaderProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
}

export const GameHeader = ({ wpm, accuracy, timeLeft }: GameHeaderProps) => {
  return (
    <header className="text-center py-6 border-b border-border">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-code-primary to-code-secondary">
          <Code className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-code-primary to-code-secondary bg-clip-text text-transparent">
          CODE PULSE
        </h1>
        <div className="p-2 rounded-lg bg-gradient-to-r from-code-secondary to-code-primary">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      
      <div className="flex justify-center gap-8 text-sm">
        <div className="text-center">
          <div className="text-code-primary font-bold text-2xl font-mono">{wpm}</div>
          <div className="text-muted-foreground">WPM</div>
        </div>
        <div className="text-center">
          <div className="text-code-secondary font-bold text-2xl font-mono">{accuracy}%</div>
          <div className="text-muted-foreground">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-code-warning font-bold text-2xl font-mono">{timeLeft}s</div>
          <div className="text-muted-foreground">Time Left</div>
        </div>
      </div>
    </header>
  );
};
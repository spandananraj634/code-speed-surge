import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface TypingAreaProps {
  currentWord: string;
  onWordComplete: (correct: boolean, timeMs: number) => void;
  onRestart: () => void;
  isGameActive: boolean;
}

export const TypingArea = ({ 
  currentWord, 
  onWordComplete, 
  onRestart,
  isGameActive 
}: TypingAreaProps) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameActive, currentWord]);

  useEffect(() => {
    if (input.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }
  }, [input, startTime]);

  const handleInputChange = (value: string) => {
    if (!isGameActive) return;
    
    setInput(value);
    
    if (value === currentWord) {
      const timeMs = startTime ? Date.now() - startTime : 0;
      onWordComplete(true, timeMs);
      setInput("");
      setStartTime(null);
    } else if (value.length > currentWord.length) {
      // User typed more than the word length, mark as incorrect
      const timeMs = startTime ? Date.now() - startTime : 0;
      onWordComplete(false, timeMs);
      setInput("");
      setStartTime(null);
    }
  };

  const getDisplayWord = () => {
    return currentWord.split("").map((char, index) => {
      let className = "transition-colors duration-150";
      
      if (index < input.length) {
        className += input[index] === char 
          ? " text-code-success bg-code-success/20" 
          : " text-code-error bg-code-error/20";
      } else if (index === input.length) {
        className += " bg-code-primary/30 animate-type-cursor";
      } else {
        className += " text-muted-foreground";
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl font-mono font-bold p-6 bg-card rounded-lg border border-border min-h-[120px] flex items-center justify-center tracking-wider">
          {getDisplayWord()}
        </div>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={isGameActive ? "Type the word above..." : "Press Start to begin"}
          className="text-center text-xl font-mono py-6 bg-card border-code-primary/30 focus:border-code-primary focus:ring-code-primary"
          disabled={!isGameActive}
        />
        
        <div className="flex justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            size="sm"
            className="gap-2 hover:border-code-primary"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
        </div>
      </div>
    </div>
  );
};
import { Difficulty } from "@/components/DifficultySelector";

export const keywords: Record<Difficulty, string[]> = {
  easy: [
    "function", "variable", "array", "string", "number", "boolean", "loop", "if", "else", "return",
    "true", "false", "null", "undefined", "const", "let", "var", "for", "while", "break",
    "continue", "switch", "case", "default", "try", "catch", "finally", "throw", "class", "object"
  ],
  medium: [
    "inheritance", "polymorphism", "encapsulation", "abstraction", "constructor", "destructor",
    "interface", "abstract", "virtual", "override", "extends", "implements", "super", "this",
    "static", "private", "public", "protected", "method", "property", "getter", "setter",
    "namespace", "module", "package", "import", "export", "prototype", "callback", "promise"
  ],
  hard: [
    "algorithm", "recursion", "iteration", "complexity", "optimization", "data structure",
    "binary tree", "linked list", "hash table", "stack", "queue", "heap", "graph", "sorting",
    "searching", "memoization", "dynamic programming", "greedy", "backtracking", "divide conquer",
    "breadth first", "depth first", "big o notation", "time complexity", "space complexity",
    "asymptotic", "polynomial", "exponential", "logarithmic", "amortized"
  ]
};

export const getRandomWord = (difficulty: Difficulty): string => {
  const wordList = keywords[difficulty];
  return wordList[Math.floor(Math.random() * wordList.length)];
};
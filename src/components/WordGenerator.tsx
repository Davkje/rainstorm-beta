import { useState } from "react";
import { wordBanks } from "../data/wordBanks";
import WordChip from "./WordChip";

type Props = {
  currentWord: string;
  setCurrentWord: (word: string) => void;
};

export default function WordGenerator({ currentWord, setCurrentWord }: Props) {
  const [bank, setBank] = useState<keyof typeof wordBanks>("nature");

  const getRandomWord = () => {
    const words = wordBanks[bank];
    if (!words || words.length === 0) return;

    let newWord = words[Math.floor(Math.random() * words.length)];

    // Undvik samma ord som innan om det finns fler än ett
    while (newWord === currentWord && words.length > 1) {
      newWord = words[Math.floor(Math.random() * words.length)];
    }

    setCurrentWord(newWord);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {Object.keys(wordBanks).map((b) => (
          <button
            key={b}
            className={`px-3 py-1 rounded ${
              bank === b ? "bg-slate-600" : "bg-slate-800"
            } hover:bg-slate-500`}
            onClick={() => setBank(b as keyof typeof wordBanks)}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="m-2">
        {/* WordChip som kan dras */}
        <WordChip word={currentWord} parentId="generator" />
      </div>

      <button
        className="mt-4 px-8 py-1 bg-slate-600 rounded hover:bg-slate-500"
        onClick={getRandomWord}
      >
        New Word
      </button>
    </div>
  );
}
export type WordBankName = "nature" | "abstract" | "places" | "verbs" | "creature";

export type Word = string;

export type WordBanks = Record<WordBankName, Word[]>;

export type Canvas = {
  id: string;
  title: string;
  words: Word[];
};

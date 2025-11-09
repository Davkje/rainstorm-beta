import WordChip from "./WordChip";
import type { WordBankName, Word } from "../types";
import { wordBanks } from "../data/wordBanks";

type Props = {
	currentWord: Word;
	setCurrentWord: (word: Word) => void;
	getRandomWord: (customBank?: WordBankName) => void;
	bank: WordBankName;
	setBank: (bank: WordBankName) => void;
};

export default function WordGenerator({ currentWord, getRandomWord, bank, setBank }: Props) {

	const changeBank = (newBank: WordBankName) => {
		setBank(newBank);
		getRandomWord(newBank);
	};

	return (
		<div className="flex flex-col justify-end items-center gap-4">
			<div className="flex justify-center h-full">
				<div className="flex flex-col justify-center">
					<WordChip word={currentWord} parentId="generator" />
				</div>
			</div>
			<div className="flex flex-wrap gap-2 justify-center w-full">
				{Object.keys(wordBanks).map((bankName) => (
					<button
						key={bankName}
						className={`flex-0 py-2 px-4 rounded text-xl capitalize ${
							bankName === bank ? "bg-slate-800" : "bg-slate-900"
						} hover:bg-slate-800`}
						onClick={() => changeBank(bankName as WordBankName)}
					>
						{bankName}
					</button>
				))}
			</div>

			<button
				className="w-full px-8 py-8 bg-slate-800 text-3xl uppercase font-bold rounded-xl hover:bg-slate-700"
				onClick={() => getRandomWord()}
			>
				New Word
			</button>
		</div>
	);
}

import { useState } from "react";
import { wordBanks } from "../data/wordBanks";
import WordChip from "./WordChip";

type Props = {
	currentWord: string;
	setCurrentWord: (word: string) => void;
};

export default function WordGenerator({ currentWord, setCurrentWord }: Props) {
	const [bank, setBank] = useState<keyof typeof wordBanks>("nature");

	const getRandomWord = (customBank?: keyof typeof wordBanks) => {
		const activeBank = customBank ?? bank;
		const words = wordBanks[activeBank];
		if (!words || words.length === 0) return;

		let newWord = words[Math.floor(Math.random() * words.length)];

		while (newWord === currentWord && words.length > 1) {
			newWord = words[Math.floor(Math.random() * words.length)];
		}
		
		setCurrentWord(newWord);
	};

	const changeBank = (newBank: keyof typeof wordBanks) => {
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
						className={`flex-0 py-2 px-4 rounded text-lg capitalize ${
							bankName === bank ? "bg-slate-800" : "bg-slate-900"
						} hover:bg-slate-800`}
						onClick={() => changeBank(bankName as keyof typeof wordBanks)}
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

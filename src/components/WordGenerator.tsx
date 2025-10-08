import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { wordBanks } from "../data/wordBanks";

export default function WordGenerator() {
	const [selectedBank, setSelectedBank] = useState<keyof typeof wordBanks>("nature");
	const [currentWord, setCurrentWord] = useState<string>("Rain");

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "word-chip",
		data: { word: currentWord },
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	const handleGenerate = () => {
		const words = wordBanks[selectedBank];
		const randomWord = words[Math.floor(Math.random() * words.length)];
		setCurrentWord(randomWord);
	};

	return (
		<div className="flex flex-col w-full p-4 rounded-lg border-2 border-slate-700">
			<h2>Word Generator</h2>
			<p className="text-5xl uppercase font-bold" ref={setNodeRef} {...listeners} {...attributes} style={style}>
				{currentWord}
			</p>
			<div className="flex justify-center gap-4">
				{Object.keys(wordBanks).map((bankName) => (
					<label key={bankName} className="flex flex-row justify-center items-center gap-2 capitalize">
						<input
							type="radio"
							
							name="bank"
							value={bankName}
							checked={selectedBank === bankName}
							onChange={() => setSelectedBank(bankName as keyof typeof wordBanks)}
						/>
						{bankName}
					</label>
				))}
			</div>
			<button className="bg-slate-800 rounded-lg font-bold hover:bg-slate-700 active:bg-slate-600" onClick={handleGenerate}>New Word</button>
		</div>
	);
}

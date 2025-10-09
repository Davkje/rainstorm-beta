import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { wordBanks } from "../data/wordBanks";

export default function WordGenerator() {
	const [selectedBank, setSelectedBank] = useState<keyof typeof wordBanks>("nature");
	const [currentWord, setCurrentWord] = useState<string>("Rain");
	const [recentWords, setRecentWords] = useState<string[]>([]);
	const recentLimit = 6;

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "word-chip",
		data: { word: currentWord },
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	function getRandomWord() {
		const words = wordBanks[selectedBank];
		let newWord = currentWord;

		let tries = 0; // Tries att hitta ett nytt ord, 50 ggr är max
		while ((recentWords.includes(newWord) || newWord === currentWord) && tries < 50) {
			const randomIndex = Math.floor(Math.random() * words.length);
			newWord = words[randomIndex];
			tries++;
		}

		setCurrentWord(newWord);

		setRecentWords((prev) => {
			const updated = [newWord, ...prev];
			return updated.slice(0, recentLimit);
		});
	}

	return (
		<div className="flex flex-col justify-between w-full p-4 rounded-lg border-2 border-slate-700">
			<span className="bg-slate-700 w-2 h-2 rounded-full"></span>
			<div className="flex justify-center py-6">
				<p
					className="text-5xl uppercase font-bold"
					ref={setNodeRef}
					{...listeners}
					{...attributes}
					style={style}
				>
					{currentWord}
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex justify-center gap-4">
					{Object.keys(wordBanks).map((bankName) => (
						<label
							key={bankName}
							className="flex flex-row justify-center items-center gap-2 capitalize"
						>
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
				<button
					className="p-3 bg-slate-800 rounded-lg font-bold hover:bg-slate-700 active:bg-slate-600"
					onClick={getRandomWord}
				>
					New Word
				</button>
			</div>
		</div>
	);
}

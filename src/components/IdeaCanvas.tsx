import { useDroppable } from "@dnd-kit/core";

type Props = {
	words: string[];
};

export default function IdeaCanvas({ words }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: "idea-canvas",
	});

	return (
		<div className="flex flex-col justify-start w-full p-4 border-2 rounded-lg border-slate-700">
			<h3 className="text-2xl font-bold leading-[0.8] pb-2">Ideas</h3>
			<div
				ref={setNodeRef}
				className={`w-full flex flex-wrap justify-center gap-2 p-2 rounded-lg transition-colors
        ${isOver ? " bg-slate-800" : "bg-slate-800"}
        `}
			>
				{words.length === 0 ? (
					<p className="italic text-slate-300">Drag word here</p>
				) : (
					words.map((word, i) => (
						<div
							key={i}
							className="p-2 max-w-max bg-slate-700 rounded-lg inline-block capitalize"
						>
							{word}
						</div>
					))
				)}
			</div>
		</div>
	);
}

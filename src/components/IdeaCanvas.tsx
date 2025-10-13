import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  title: string;
	words: string[];
};

export default function IdeaCanvas({ id, title, words }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id,
	});

	return (
		<div className="flex flex-col justify-start w-full p-4 rounded-lg">
			<h3 className="text-2xl font-bold leading-[0.8] pb-2 ">{title}</h3>
			<div
				ref={setNodeRef}
				className={`w-full min-h-16 flex flex-wrap justify-center items-center gap-2 p-2 rounded-lg transition-colors
        ${isOver ? " bg-slate-700" : "bg-slate-800"}
        `}
			>
				{words.length === 0 ? (
					<p className="text-slate-100">Drop or Write here!!!</p>
				) : (
					words.map((word, i) => (
						<div
							key={i}
							className="p-2 max-w-max bg-slate-700 font-bold text-xl rounded-lg inline-block capitalize"
						>
							{word}
						</div>
					))
				)}
			</div>
		</div>
	);
}

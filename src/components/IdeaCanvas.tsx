import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import WordChip from "./WordChip";

type Props = {
	id: string;
	title: string;
	words: string[];
	onAddWord?: () => void;
};

export default function IdeaCanvas({ id, title, words, onAddWord }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: { parentId: id },
	});

	return (
		<div
			ref={setNodeRef}
			className={`flex flex-col p-4 border-2 rounded-lg transition-colors ${
				isOver ? "border-slate-400 bg-slate-800" : "border-slate-700 bg-slate-900"
			}`}
		>
			<h3 className="text-2xl font-bold pb-2">{title}</h3>

			<SortableContext items={words.map((w) => `${id}-${w}`)} strategy={rectSortingStrategy}>
				<div className="flex flex-wrap gap-2 justify-center">
					{words.length === 0 ? (
						<p className="italic text-slate-400 self-center">Drag word here</p>
					) : (
						words.map((word) => <WordChip key={word} word={word} parentId={id} />)
					)}
				</div>
			</SortableContext>

			{onAddWord && (
				<button
					onClick={onAddWord}
					className="mt-2 px-3 py-1 bg-slate-600 rounded hover:bg-slate-500"
				>
					Add current word
				</button>
			)}
		</div>
	);
}

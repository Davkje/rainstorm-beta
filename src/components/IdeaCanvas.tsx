import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import WordChip from "./WordChip";

type Props = {
	id: string;
	title: string;
	words: string[];
	isDraggingWord: boolean;
	overCanvasId: string | null;
	draggingFrom: string | null;
};

export default function IdeaCanvas({ id, title, words, isDraggingWord, overCanvasId, draggingFrom }: Props) {
	const { setNodeRef } = useDroppable({
		id,
		data: { parentId: id },
	});

	const { setNodeRef: setTrashRef, isOver: isOverTrash } = useDroppable({
		id: `${id}-trash`,
		data: { parentId: id, isTrash: true },
	});

	return (
		<div
			ref={setNodeRef}
			className={`flex flex-col text-xl flex-1 p-4 border-2 border-slate-700 rounded-lg transition-colors`}
		>
			<h3 className="text-3xl font-bold lg:text-start">{title}</h3>

			<SortableContext items={words.map((w) => `${id}-${w}`)} strategy={rectSortingStrategy}>
				<div className="flex-1">
					<div className="flex flex-wrap gap-2 text-xl justify-center">
						{words.length === 0 ? (
							<p className="italic text-slate-700 self-center">Drag word here</p>
						) : (
							words.map((word) => <WordChip key={word} word={word} parentId={id} />)
						)}
					</div>
				</div>
			</SortableContext>
			<div
				className={`flex justify-end
          `}
			>
				<span
					ref={setTrashRef}
					className={`
			material-symbols-outlined rounded p-1 transition-all duration-200
			${isDraggingWord && overCanvasId === id && draggingFrom !== "generator" ? "opacity-100 scale-100" : "opacity-0 scale-0"}
			${isOverTrash ? "text-white bg-red-800/50" : "text-slate-700"}
		`}
				>
					delete
				</span>
			</div>
		</div>
	);
}

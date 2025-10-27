import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	word: string;
	parentId: string;
};

export default function WordChip({ word, parentId }: Props) {
	// Gör ordet "sortable" via dnd-kit
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: `${parentId}-${word}`, // unikt ID för varje chip
		data: {
			type: "word",
			word,
			parentId,
		},
	});

	// Visuell animation för flyttning
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: "grab",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`flex flex-col justify-center px-8 py-4 bg-slate-700 rounded-lg text-slate-100 text-xl capitalize select-none
        ${isDragging ? "ring-2 ring-slate-400 scale-105" : "hover:bg-slate-600"}`}
		>
			{word}
		</div>
	);
}

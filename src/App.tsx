import "./App.css";
import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import IdeaCanvas from "./components/IdeaCanvas";
import WordGenerator from "./components/WordGenerator";
import { DragOverlay } from "@dnd-kit/core";
import WordChip from "./components/WordChip";
import { arrayMove } from "@dnd-kit/sortable";

type Canvas = {
	id: string;
	title: string;
	words: string[];
};

export default function App() {
	const [canvases, setCanvases] = useState<Canvas[]>([
		{ id: "canvas-ideas", title: "Ideas", words: [] },
		{ id: "canvas-themes", title: "Themes", words: [] },
		{ id: "canvas-characters", title: "Characters", words: [] },
	]);

	const [generatedWord, setGeneratedWord] = useState<string>("Rain");
	const [draggingWord, setDraggingWord] = useState<{ word: string; parentId: string } | null>(null);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragStart = (event: DragStartEvent) => {
		const activeWord = event.active.data?.current;
		if (activeWord) setDraggingWord(activeWord);
	};

	// Hantera drag & drop
	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingWord(null);
		const { active, over } = event;
		if (!active || !over) return;

		const activeWord = active.data?.current?.word;
		const activeParent = active.data?.current?.parentId;
		const overParent = over.data?.current?.parentId;
		if (!activeWord || !activeParent || !overParent) return;

		// Hindra drop i generator
		if (overParent === "generator") return;

		setCanvases((prev) => {
			let updated = [...prev];

			// --- Drag mellan olika canvases ---
			if (activeParent !== overParent) {
				updated = updated.map((c) => {
					if (c.id === activeParent)
						return { ...c, words: c.words.filter((w) => w !== activeWord) };
					if (c.id === overParent && !c.words.includes(activeWord))
						return { ...c, words: [...c.words, activeWord] };
					return c;
				});
				return updated;
			}

			// --- Drag inom samma canvas (sortering) ---
			const canvasIndex = updated.findIndex((c) => c.id === activeParent);
			if (canvasIndex === -1) return updated;

			const canvas = updated[canvasIndex];
			const oldIndex = canvas.words.indexOf(activeWord);
			const newIndex = canvas.words.indexOf(over.data?.current?.word);

			if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
				const newWords = arrayMove(canvas.words, oldIndex, newIndex);
				updated[canvasIndex] = { ...canvas, words: newWords };
			}

			return updated;
		});
	};

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-8 m-auto">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
			>
				<h1 className="text-4xl font-bold mb-8">RAINSTORM</h1>
				<WordGenerator currentWord={generatedWord} setCurrentWord={setGeneratedWord} />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
					{canvases.map((canvas) => (
						<IdeaCanvas key={canvas.id} id={canvas.id} title={canvas.title} words={canvas.words} />
					))}
				</div>
				<DragOverlay dropAnimation={null}>
					{draggingWord ? (
						<WordChip word={draggingWord.word} parentId={draggingWord.parentId} />
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}

import "./App.css";
import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragOverEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
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

	const [generatedWord, setGeneratedWord] = useState<string>("rain");
	const [draggingWord, setDraggingWord] = useState<{ word: string; parentId: string } | null>(null);
	const [isDraggingWord, setIsDraggingWord] = useState(false);
	const [overCanvasId, setOverCanvasId] = useState<string | null>(null);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragStart = (event: DragStartEvent) => {
		const activeData = event.active.data?.current as { word: string; parentId: string } | undefined;
		if (activeData) {
			setDraggingWord(activeData);
			setIsDraggingWord(true);
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { over } = event;
		if (over?.data?.current?.parentId) {
			setOverCanvasId(over.data.current.parentId);
		} else {
			setOverCanvasId(null);
		}
	};
	// Hantera drag & drop
	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingWord(null);
		setIsDraggingWord(false);
		setOverCanvasId(null);
		const { active, over } = event;
		if (!active || !over) return;

		const activeWord = active.data?.current?.word;
		const activeParent = active.data?.current?.parentId;
		const overParent = over.data?.current?.parentId;
		if (!activeWord || !activeParent || !overParent) return;

		// TRASH
		if (over.data?.current?.isTrash) {
			setCanvases((prev) =>
				prev.map((c) =>
					c.id === activeParent ? { ...c, words: c.words.filter((w) => w !== activeWord) } : c
				)
			);
			return;
		}

		// Hindra drop i generator
		if (overParent === "generator") return;

		setCanvases((prev) => {
			let updated = [...prev];

			// Drag to new Canvas
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

			// Drag Sorting
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
		<div className="font-bold grid gap-4 grid-rows-[24px_1fr_] min-h-screen w-full p-4 bg-slate-950 text-slate-100">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
			>
				<header className="flex justify-between items-center">
					<div className="w-[150px]">
						<img src="/rainstorm.png" alt="rainstorm" width={1242} height={167} />
					</div>
					<nav>
						<ul className="flex text-lg gap-4">
							<li>Storms</li>
							<li>Templates</li>
						</ul>
					</nav>
				</header>
				<main className="grow grid grid-cols-2 gap-4">
					<WordGenerator currentWord={generatedWord} setCurrentWord={setGeneratedWord} />
					<div className="flex flex-col gap-4">
						{canvases.map((canvas) => (
							<IdeaCanvas
								key={canvas.id}
								id={canvas.id}
								title={canvas.title}
								words={canvas.words}
								isDraggingWord={isDraggingWord}
								overCanvasId={overCanvasId}
								draggingFrom={draggingWord?.parentId || null}
							/>
						))}
					</div>
					<DragOverlay dropAnimation={null}>
						{draggingWord ? (
							<WordChip word={draggingWord.word} parentId={draggingWord.parentId} />
						) : null}
					</DragOverlay>
				</main>
			</DndContext>
		</div>
	);
}

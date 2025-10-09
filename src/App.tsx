import "./App.css";
import { useState } from "react";
import WordGenerator from "./components/WordGenerator";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import IdeaCanvas from "./components/IdeaCanvas";

function App() {
	const [canvases, setCanvases] = useState([
		{ id: "canvas-ideas", title: "Ideas", words: [] as string[] },
		{ id: "canvas-themes", title: "Themes", words: [] as string[] },
		{ id: "canvas-characters", title: "Characters", words: [] as string[] },
	]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event;

		if (!over || !active?.data?.current?.word) return;

		const word = active.data.current.word;

		setCanvases((prev) =>
			prev.map((c) =>
				c.id === over.id && !c.words.includes(word)
					? { ...c, words: [...c.words, word] }
					: c
			)
		);
	};

	return (
		<>
			<DndContext onDragEnd={handleDragEnd}>
				<section className="flex w-full h-full flex-col justify-start gap-4">
					<h1 className="text-5xl font-bold m-4">RAINSTORM</h1>
					<div className="flex gap-4 p-4 flex-col">
						<WordGenerator />
						<div className="flex flex-col gap-4 border-2 rounded-lg w-full border-slate-700">
							{canvases.map((c) => (
								<IdeaCanvas key={c.id} id={c.id} title={c.title} words={c.words} />
							))}
						</div>
					</div>
				</section>
			</DndContext>
		</>
	);
}

export default App;

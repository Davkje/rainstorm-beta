import { useState } from "react";
import "./App.css";
import WordGenerator from "./components/WordGenerator";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import IdeaCanvas from "./components/IdeaCanvas";

function App() {
	const [ideaWords, setideaWords] = useState<string[]>([]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event;

		if (over?.id === "idea-canvas" && active?.data?.current?.word) {
			const word = active.data.current.word;
			if (!ideaWords.includes(word)) {
				setideaWords([...ideaWords, word]);
			}
		}
	};

	return (
		<>
			<DndContext onDragEnd={handleDragEnd}>
				<section className="flex w-full flex-col justify-center gap-4">
					<h1>RAINSTORM</h1>
					<div className="flex w-full gap-4 p-4">
						<WordGenerator />
						<IdeaCanvas words={ideaWords} />
					</div>
				</section>
			</DndContext>
		</>
	);
}

export default App;

import type { Canvas } from "../App";

type Props = {
	canvases: Canvas[];
};

export default function WriteCanvas({ canvases }: Props) {
	return (
		<>
			<div className="grid gap-2 bg-slate-300/10 p-4 rounded-lg">
				{canvases.map((canvas) => (
					<div key={canvas.id} className="flex flex-col gap-1 text-left text-2xl">
						<div className="flex gap-2">
							<label className="text-3xl" htmlFor={canvas.id}>
								{canvas.title}
							</label>
							<div className="flex gap-2 flex-wrap">
								{canvas.words.map((word) => (
									<div key={word} className="flex justify-center items-center gap-2">
										<p className="capitalize text-slate-600 flex justify-center items-center">
											{word}
										</p>
									</div>
								))}
							</div>
						</div>
						<textarea
							name={canvas.title}
							id={canvas.id}
							className="border-2 border-slate-600 p-2 rounded-lg resize-none placeholder-slate-700"
							placeholder={`${canvas.words.join(", ")}...?`}
							rows={3}
						></textarea>
					</div>
				))}
			</div>
		</>
	);
}

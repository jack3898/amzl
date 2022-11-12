type PreviewImgProps = {
	src: string;
	caption: string;
};

export function PreviewImg({ src, caption }: PreviewImgProps) {
	if (!src) return null;

	return (
		<figure className="relative max-h-48 overflow-hidden inline-block">
			<img src={src} className="relative h-full w-auto" />
			<figcaption className="absolute top-2 left-2 bg-white opacity-75 px-1 rounded">
				{caption}
			</figcaption>
		</figure>
	);
}

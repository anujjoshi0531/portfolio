interface NoWorkProps {
	className?: string;
	/**
	 * When true (default), the SVG inherits the parent's CSS `color` via
	 * currentColor. Uses an <object> tag so currentColor works across themes.
	 * When false, renders as a plain <img> (slightly faster but no color tinting).
	 */
	tinted?: boolean;
}

export default function NoWork({ className, tinted = true }: NoWorkProps) {
	if (tinted) {
		return (
			<object
				data="/no-work.svg"
				type="image/svg+xml"
				aria-hidden="true"
				className={className}
				width={595}
				height={595}
			/>
		);
	}

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src="/no-work.svg"
			alt=""
			aria-hidden="true"
			className={className}
			width={595}
			height={595}
			loading="lazy"
		/>
	);
}

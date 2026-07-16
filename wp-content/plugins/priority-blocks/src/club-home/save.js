import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		title_01,
		title_02,
		title_03,
		image,
		description_01,
		description_02,
		video,
		button
	} = attributes;

	return (
		<section {...useBlockProps.save({ className: 'sd-club-home' })}>
			{(title_01 || title_02 || title_03) && (
				<div className="container">
					<h2>
						{title_01 && (
							<RichText.Content
								tagName="span"
								value={title_01}
								className="fade-in-left wow"
							/>
						)}
						{title_02 && (
							<RichText.Content
								tagName="span"
								value={title_02}
								className="fade-in-left-05 wow"
							/>
						)}
						{title_03 && (
							<RichText.Content
								tagName="span"
								value={title_03}
								className="fade-in-right-1 wow"
							/>
						)}
					</h2>
				</div>
			)}

			{video?.url && (
				<video
					src={video.url}
					poster={video?.poster?.url || false}
					controls
					playsinline
					loading="lazy"
					controlsList="nodownload"
					oncontextmenu="return false;"
				>
				</video>
			)}

			{(description_01 || description_02 || button) && (
				<div className="sd-club-home__text">
					<div className="container">
						{description_01 && (
							<RichText.Content
								tagName="h3"
								value={description_01}
							/>
						)}
						{description_02 && (
							<RichText.Content
								tagName="p"
								value={description_02}
								className="fade-in-right wow"
							/>
						)}
						{(button?.show && button?.text) && (
							<a
								className={`${button.modal ? 'sd-modal-link sd-button-modal' : 'sd-button-link'}`}
							>
								{button.text}
							</a>
						)}
					</div>
				</div>
			)}
		</section>
	);
}

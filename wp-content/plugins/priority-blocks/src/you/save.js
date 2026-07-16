import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title, youList, image_url, image_alt, video } = attributes;

	return (
		<section {...useBlockProps.save({ className: 'sd-you' })}>
			<div className="container">
				{title && <RichText.Content tagName="h2" value={title} />}
				<div className="sd-you__wrapper">
					{video.url && (
						<a
							class="glightbox5"
							href={video.url}
						>
							<img src={video?.poster?.url} loading="lazy" />
						</a>
					)}
					{youList && youList.length > 0 && (
						<ul className="sd-you__ul">
							{youList?.map((item, index) => {
								let fadeClassName = '';

								switch (index % 3) {
									case 0:
										fadeClassName = 'fade-in-right';
										break;
									case 1:
										fadeClassName = 'fade-in-right-05';
										break;
									case 2:
										fadeClassName = 'fade-in-right-1';
										break;
								}

								return (
									<RichText.Content
										tagName="li"
										key={index}
										className={`${fadeClassName} wow`}
										value={item}
									/>
								);
							})}
						</ul>
					)}
				</div>
			</div>

			{image_url && (
				<img src={image_url} alt={image_alt} loading="lazy" />
			)}
		</section>
	);
}

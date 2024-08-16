import type { RootContent } from 'mdast';

import type { VideoExtensionOptions } from './types';

function isUrl(url: string): boolean {
	return /^(http|https):\/\/[^ "]+$/.test(url);
}

export function getSearchParams(url: string): Map<string, string> {
	if (!isUrl(url)) {
		return new Map();
	}

	const parsed = new URL(url);
	const params: Map<string, string> = new Map();

	for (const [key, value] of parsed.searchParams) {
		params.set(key, value);
	}

	return params;
}

export function getGenericIframeNode(url: string, options: VideoExtensionOptions) {
	const node = {
		type: 'div',
		data: {
			hProperties: {
				className: `video-container ${options.align}`,
			},
		},
		children: [
			{
				type: 'iframe',
				url,
				data: {
					hName: 'iframe',
					hProperties: {
						src: url,
						width: options.width,
						height: options.height,
						allowfullscreen: options.allowFullscreen,
						frameborder: 0,
						allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
					},
				},
			},
		],
	};

	return node as RootContent;
}

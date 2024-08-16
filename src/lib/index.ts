import type { Plugin as CartaPlugin } from 'carta-md';
import type { Link, Node, Parent, Text } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { findBefore } from 'unist-util-find-before';
import { SKIP, visit, type Visitor, type VisitorResult } from 'unist-util-visit';

import VideoIcon from './components/icons/VideoIcon.svelte';
import type { VideoExtensionOptions, VideoService } from './types';
import { renderVideo } from './video-parser';

export * from './default.css?inline';
export * from './types';

const defaultOptions: VideoExtensionOptions = {
	noCookie: false,
	width: 640,
	height: 360,
	align: 'center',
	allowFullscreen: true,
};

export const video = (options?: VideoExtensionOptions): CartaPlugin => {
	const finalOptions = {
		...defaultOptions,
		...options,
	};

	const transformer = (ast: any) => {
		const visitor: Visitor<Link, Parent> = (node: Link, index, parent): VisitorResult => {
			if (!parent || typeof index === 'undefined') return;

			const previousNode = findBefore(parent, node, (node: Node) => {
				return node.type === 'text';
			});

			if (!previousNode) return;

			const lastChar = (previousNode as Text).value.slice(-1);

			if (lastChar !== '@') return;

			/**
			 * Found the whole video tag
			 * - Remove the @ from the text node
			 * - Replace the link node with a video node
			 */

			(previousNode as Text).value = (previousNode as Text).value.slice(0, -1);

			const videoProvider = toString(node);
			const videoIdOrUrl = node.url;

			const videoNode = renderVideo(videoProvider as VideoService, videoIdOrUrl, finalOptions);

			parent.children.splice(index!, 1, videoNode);

			return [SKIP, index! + 1];
		};

		visit(ast, 'link', visitor);
	};

	return {
		transformers: [
			{
				type: 'remark',
				execution: 'sync',
				transform: ({ processor }) => {
					processor.use(() => transformer);
				},
			},
		],
		icons: [
			{
				id: 'video',
				action: (input) => {
					const selection = input.getSelection();
					const videoTag = '\n@[youtube](youtubeVideoIdOrUrl)\n';
					input.insertAt(selection.start, videoTag);
					input.textarea.setSelectionRange(selection.start + 1, selection.start + videoTag.length - 1);
				},
				component: VideoIcon,
			},
		],
	};
};

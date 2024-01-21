import { render as renderVimeo } from './services/vimeo';
import { render as renderYoutube } from './services/youtube';
import type { VideoExtensionOptions, VideoService } from './types';

export function renderVideo(service: VideoService, videoIdOrUrl: string, options: VideoExtensionOptions): string {
	switch (service) {
		case 'youtube':
			return renderYoutube(videoIdOrUrl, options);
		case 'vimeo':
			return renderVimeo(videoIdOrUrl, options);
		default:
			break;
	}

	return '(Unsupported video)';
}

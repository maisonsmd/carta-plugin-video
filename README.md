![plugin-video](https://img.shields.io/npm/v/@maisonsmd/carta-plugin-video)

# carta-plugin-video

This plugin adds ability to render online video from Youtube or Vimeo.

Inspired by [markdown-it-video](https://github.com/CenterForOpenScience/markdown-it-video)

## Installation

```shell
npm i @maisonsmd/carta-plugin-video
```

## Setup

### Styles

Import the default theme, or create you own:

```ts
import '@maisonsmd/carta-plugin-video/default.css';
```

Note that the `align` function needs the default css to work properly.

For custom styles, this is an example of the generated HTML:

```HTML
<div class="video-container center">
	<iframe
		width="640"
		height="390"
		src="<the URL>"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen>
	</iframe>
</div>
```

### Extension

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import { video } from '@maisonsmd/carta-plugin-video';
	import '@maisonsmd/carta-plugin-video/default.css';

	const carta = new Carta({
		extensions: [
			video({
				// Optional options
			}),
		],
	});
</script>

<CartaEditor {carta} />
```

## Usage

You can use either video ID (e.g: `dQw4w9WgXcQ`) or video URL (e.g: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley`)

For Youtube:

```markdown
@[youtube](dQw4w9WgXcQ)
@[youtube](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```

For Vimeo:

```markdown
@[vimeo](347119375)
@[vimeo](https://vimeo.com/347119375)
```

## Options

Here are the options you can pass to `video()`:

```ts
export interface VideoExtensionOptions {
	/**
	 * Width of the video (in pixels or percentage string), defaults to 640.
	 */
	width?: number | string;
	/**
	 * Height of the video (in pixel or percentage string), defaults to 360.
	 */
	height?: number | string;
	/**
	 * Horizontal alignment of the video, defaults to 'center'.
	 */
	align?: 'left' | 'center' | 'right';
	/**
	 * Allow fullscreen, defaults to true.
	 */
	allowFullscreen?: boolean;
	/**
	 * Use youtube-nocookie.com domain, defaults to false.
	 */
	noCookie?: boolean;
}
```

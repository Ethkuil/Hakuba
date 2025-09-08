import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

// necessary for remark-footnotes to work but not sure why
import dotenv from 'dotenv'
dotenv.config()

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  preprocess: [
    preprocess({
      preserve: ['ld+json'],
      postcss: true
    }),
  ],

  kit: {
    adapter: adapter({ fallback: '404.html' }),
    prerender: {
      default: true
    },
    inlineStyleThreshold: 1024 * 32
  }
}

export default config

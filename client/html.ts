import type { Plugin } from 'vite'

export const html = (): Plugin => ({
  name: 'html-transform',
  transformIndexHtml: () => [{
    tag: 'script',
    attrs: {
      type: 'module',
      src: '/socket.io/socket.io.js',
    },
    // children?: string | HtmlTagDescriptor[]
    /* default: 'head-prepend' */
    injectTo: 'body-prepend', // 'head' | 'body' | 'head-prepend' | 'body-prepend'
  }],
})

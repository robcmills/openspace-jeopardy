// Experimental
export const MyApp = () =>
  div(
    div(
      a({ href: 'https://vitejs.dev', target: '_blank' },
        img({ src: viteLogo, class: 'logo', alt: 'Vite logo' }),
      ),
      a({ href: 'https://react.dev', target: '_blank' },
        img({ src: reactLogo, class: 'logo react', alt: 'React logo' }),
      ),
    ),
    h1('Vite + React'),
    div({ class: 'card' },
      button({ onClick: () => setCount((count) => count + 1) },
        `count is ${count}`
      ),
      p(`Edit ${code('src/App.tsx')} and save to test HMR`),
    ),
    p({ class: 'read-the-docs' },
      'Click on the Vite and React logos to learn more'
    )
  )

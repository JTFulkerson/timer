import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Timer - A simple, customizable timer app' },
      // Open Graph
      { property: 'og:title', content: 'Timer - A simple, customizable timer app' },
      { property: 'og:description', content: 'A beautiful, customizable timer for productivity, workouts, and more. Fast, minimal, and works everywhere.' },
      { property: 'og:image', content: '/preview.png' },
      { property: 'og:url', content: 'https://timer.johnfulkerson.com' },
      { property: 'og:type', content: 'website' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Timer - A simple, customizable timer app' },
      { name: 'twitter:description', content: 'A customizable timer for productivity, workouts, and more. Fast, minimal, and works everywhere.' },
      { name: 'twitter:image', content: '/preview.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {isDev && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
}

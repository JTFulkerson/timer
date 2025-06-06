import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Only custom tags like favicon, description, etc. should be here */}
                <meta name="description" content="Interactive timer with quick set buttons and keyboard shortcuts" />
                <link rel="icon" href="/icons/timer-favicon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Timer</title>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
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

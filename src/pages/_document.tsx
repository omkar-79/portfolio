import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
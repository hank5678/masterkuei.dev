import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="zh-tw">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-gradient-to-br from-cyan-500 to-pink-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

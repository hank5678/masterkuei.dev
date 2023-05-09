import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Vaporwave from "@/components/vaporwave"
import { Noto_Sans_TC } from "next/font/google"
import Nav from "@/components/nav"

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notoSansTC.className} w-full h-screen flex flex-col`}>
      <Nav />
      <section className="main-wrapper">
        <Vaporwave />
        <div className="relative w-full h-full">
          <Component {...pageProps} />
        </div>
      </section>
    </main>
  )
}

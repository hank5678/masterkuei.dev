import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Vaporwave from "@/components/vaporwave"
import { Noto_Sans_TC } from "next/font/google"
import Nav from "@/components/nav"
import { useRouter } from "next/router"

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <main className={`${notoSansTC.className} w-full`}>
      {router.pathname !== "/" && <Nav />}
      <Vaporwave />
      <section className="relative">
        <Component {...pageProps} />
      </section>
    </main>
  )
}

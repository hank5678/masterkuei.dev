import { Noto_Sans_TC } from "next/font/google"
import Vaporwave from "@/components/vaporwave"

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true
})

export default function Home() {
  return (
    <>
      {/* <div className="body-bg" /> */}
      <main
        className={`${notoSansTC.className} w-full h-screen p-10 flex flex-col`}
      >
        {/* <nav className="w-full h-10 flex-initial relative top-1">
          <ul className="flex h-full ml-4">
            <li className="bg-gray-800 px-3 py-2 font-bold text-lg text-zinc-200 border-r-4 border-r-gray-950 border-t-4 border-t-gray-400 border-l-4 rounded-t-lg border-l-gray-400 -mt-2">
              關於
            </li>
            <li className="bg-gray-800 px-3 py-2 font-bold text-lg text-zinc-200 border-r-4 border-r-gray-950 border-t-4 border-t-gray-400 border-l-4 rounded-t-lg border-l-gray-400 -mt-3 -ml-1 -mr-1 z-10">
              部落格
            </li>
            <li className="bg-gray-800 px-3 py-2 font-bold text-lg text-zinc-200 border-r-4 border-r-gray-950 border-t-4 border-t-gray-400 border-l-4 rounded-t-lg border-l-gray-400 -mt-2">
              測試一下
            </li>
          </ul>
        </nav> */}
        <section className="main-wrapper">
          <Vaporwave />
          <div className="text-g flex flex-col items-center absolute-center">
            <p className="text-9xl glitch-text mb-6">masterkuei.dev</p>
            <p className="text-sm mb-4 text-zinc-600 ">
              {
                '{name: "蔡貴翰", from: "Taipei", career: "frontend developer", email: "hank5678tw@gmail.com"}'
              }
            </p>
            <p className="text-center text-zinc-100">
              <span className="inline-block align-middle">
                我叫蔡貴翰，前端工作經驗12年
              </span>
              <br />
              <span className="inline-block align-middle">
                在前端工程師一詞未普及以前，就已經確定它是我的志向
              </span>
              <br />
              <span className="inline-block align-middle">
                小時因為電玩的關係，建立了我第一個網站
              </span>
              <br />
              <span className="inline-block align-middle mb-4">
                因此開啟我對網站開發的熱忱，直到現在沒有變
              </span>
              <br />
              <span className="inline-block align-middle mr-3">
                如果想知道更多，可以
              </span>
              <a
                role="button"
                className="px-5 py-3 text-2xl inline-block button align-middle text-zinc-900"
              >
                <span className="relative">和我聊聊</span>
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

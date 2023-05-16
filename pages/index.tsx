import { useRouter } from "next/router"
import Link from "next/link"
import classNames from "classnames"

const pages = [
  {
    name: "首頁",
    href: "/"
  },
  {
    name: "關於我",
    href: "/about"
  },
  {
    name: "部落格",
    href: "/blog"
  }
]

export default function Home() {
  const router = useRouter()

  return (
    <>
      <section className="text-g flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="glitch-text mb-6 text-9xl" data-text="masterkuei.dev">
            masterkuei.dev
          </h1>
          <p className="mb-4 text-center text-sm text-zinc-200">
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
            <span className="mb-4 inline-block align-middle">
              因此開啟我對網站開發的熱忱，直到現在沒有變
            </span>

            {/* <br /> */}
            {/* <span className="inline-block align-middle mr-3">
            如果想知道更多，可以
          </span>
          <a
            role="button"
            className="px-5 py-3 text-2xl inline-block button align-middle text-zinc-900"
          >
            <span className="relative">和我聊聊</span>
          </a> */}
          </p>
          <nav className="flex text-2xl font-light text-zinc-200 before:content-['['] after:content-[']']">
            <ul className="flex items-center">
              {pages.map((el, id, arr) => {
                const active = el.href === router.pathname
                const isLastElement = id === arr.length - 1
                return (
                  <li
                    key={id}
                    className={classNames("mx-1", {
                      "after:content-[',']": !isLastElement,
                      "mr-2": !isLastElement
                    })}
                  >
                    {/* <span>&quot;</span> */}
                    <Link
                      href={el.href}
                      className={classNames({ "font-bold": active })}
                    >
                      {el.name}
                    </Link>
                    {/* <span>&quot;</span> */}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}

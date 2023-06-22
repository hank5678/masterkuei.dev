import Link from "next/link"
import { createElement } from "react"
import { useRouter } from "next/router"
import classNames from "classnames"
import { RiHome4Fill, RiSwordFill, RiArticleFill } from "react-icons/ri"

const pages = [
  {
    name: "首頁",
    href: "/",
    icon: RiHome4Fill
  },
  {
    name: "關於我",
    href: "/about",
    icon: RiSwordFill
  },
  {
    name: "部落格",
    href: "/blog",
    icon: RiArticleFill
  }
]

const checkActive = (href: string, pathname: string) => {
  if (href === "/") {
    return href === pathname
  } else {
    return pathname.includes(href)
  }
}

export default function Nav() {
  const router = useRouter()

  return (
    <nav className="relative z-10 mx-auto mb-12 mt-8 w-full max-w-7xl transform items-center justify-between overflow-hidden px-6 text-zinc-200">
      <div className="flex h-full items-center justify-between">
        <p className="text-3xl font-bold">masterkuei.dev</p>
        <div className="flex text-2xl font-bold text-zinc-200  before:content-['['] after:content-[']']">
          <ul className="flex items-center text-xl">
            {pages.map((el, id, arr) => {
              const active = checkActive(el.href, router.pathname)

              const isLastElement = id === arr.length - 1
              return (
                <li
                  key={id}
                  className={classNames("relative mx-1", {
                    "after:ml-1 after:mr-2 after:content-[',']": !isLastElement
                  })}
                >
                  <Link
                    href={el.href}
                    className={classNames("relative", {
                      "before:absolute before:bottom-0 before:left-0 before:h-3 before:w-full before:bg-gradient-to-r before:from-akblue-500 before:to-akred-500":
                        active
                    })}
                  >
                    {/* TODO 確認 createElement 是不是最好的做法 */}
                    {createElement(el.icon, {
                      className: "relative mr-1 inline-block"
                    })}
                    <span className="relative">{el.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

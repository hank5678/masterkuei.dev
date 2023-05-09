import Link from "next/link"
import { useRouter } from "next/router"
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

export default function Nav() {
  const router = useRouter()
  console.log(router)

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
      <ul className="flex text-2xl text-zinc-200 font-light">
        {pages.map((el, id) => (
          <li
            key={id}
            className={classNames("mx-1", {
              "font-bold": el.href === router.pathname
            })}
          >
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
        {/* <li className="mx-1">
          <Link href="/">首頁</Link>
        </li>
        <li className="mx-1">/</li>
        <li className="mx-1">
          <Link href="/about">關於我</Link>
        </li>
        <li className="mx-1">/</li>
        <li className="mx-1">
          <Link href="/blog">部落格</Link>
        </li> */}
      </ul>
    </nav>
  )
}

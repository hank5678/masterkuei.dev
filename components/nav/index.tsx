import Link from "next/link"
import { useRouter } from "next/router"
import useScrollDirection, { Direction } from "@/hooks/useScrollDirection"
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

{
  /* <nav className="flex before:content-['['] after:content-[']'] text-zinc-200 text-2xl font-normal">
<ul className="flex items-center">
  <li className="after:content-[','] mr-2">首頁</li>
  <li className="after:content-[','] mr-2">關於我</li>
  <li>部落格</li>
</ul>
</nav> */
}
export default function Nav() {
  const scrollDirection = useScrollDirection()
  const router = useRouter()
  const show = !(scrollDirection === Direction.UP)

  return (
    <nav
      className={classNames(
        "fixed left-1/2 top-4 z-10 w-full max-w-2xl -translate-x-1/2 transform items-center justify-between overflow-hidden rounded-lg bg-gradient-to-r from-akblue-500/20 to-akred-500/20 px-6 text-zinc-200 backdrop-blur-md transition-all ease-out",
        {
          "h-20": show,
          "h-4 -translate-y-2": !show
        }
      )}
    >
      <div
        className={classNames(
          "flex h-full items-center justify-between transition-all",
          {
            "opacity-0": !show
          }
        )}
      >
        <p className="text-4xl font-bold">masterkuei.dev</p>
        <div className="flex text-2xl font-light text-zinc-200 before:content-['['] after:content-[']']">
          <ul className="flex items-center text-xl">
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
        </div>
      </div>
    </nav>
  )
}

// export default function Nav() {
//   const router = useRouter()

//   return (
//     <nav className="fixed left-1/2 top-5 z-10 flex -translate-x-1/2 transform text-2xl font-normal text-zinc-200 before:content-['['] after:content-[']']">
//       <ul className="flex items-center text-2xl font-light">
//         {pages.map((el, id, arr) => (
//           <li
//             key={id}
//             className={classNames("mx-1", {
//               "after:content-[',']": id < arr.length - 1,
//               "mr-2": id < arr.length - 1,
//               "font-bold": el.href === router.pathname
//             })}
//           >
//             <span>&quot;</span>
//             <Link href={el.href}>{el.name}</Link>
//             <span>&quot;</span>
//           </li>
//         ))}
//         {/* <li className="mx-1">
//           <Link href="/">首頁</Link>
//         </li>
//         <li className="mx-1">/</li>
//         <li className="mx-1">
//           <Link href="/about">關於我</Link>
//         </li>
//         <li className="mx-1">/</li>
//         <li className="mx-1">
//           <Link href="/blog">部落格</Link>
//         </li> */}
//       </ul>
//     </nav>
//   )
// }

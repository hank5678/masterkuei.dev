import dayjs from "dayjs"
import Link from "next/link"
import { getAllPosts } from "@/lib/api"
import classNames from "classnames"

interface IPost {
  date: string
  title: string
  excerpt: string
  slug: string
  hashtag: string[]
}

// const Post = ({
//   date = "",
//   title = "",
//   excerpt = "",
//   slug = "",
//   hashtag = []
// }: IPost) => {
//   return (
//     <Link as={`/blog/${slug}`} href="/blog/[slug]">
//       <div className="my-16">
//         <p className="text-xs text-zinc-200">
//           <span className="mr-3">{dayjs(date).format("YYYY/MM/DD")}</span>
//           <span className="text-zinc-200">
//             {hashtag.map((el) => (
//               <span key={el} className="mr-1">
//                 #{el}
//               </span>
//             ))}
//           </span>
//         </p>
//         <p className="text-4xl text-zinc-200 gradient-underline-text font-bold mb-2">
//           <span className="inline-block relative">{title}</span>
//         </p>
//         <p className="text-base text-zinc-200">{excerpt}</p>
//       </div>
//     </Link>
//   )
// }

const Post = ({
  date = "",
  title = "",
  excerpt = "",
  slug = "",
  hashtag = []
}: IPost) => {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]" className="w-1/2 p-5">
      <div className="gradient-box p-4">
        <p className="text-xs text-zinc-200">
          {dayjs(date).format("YYYY/MM/DD")}
        </p>
        <p className="mb-4 text-3xl font-bold text-zinc-200">{title}</p>
        <p className="mb-4 text-base text-zinc-200">{excerpt}</p>
        <span className="text-xs text-zinc-200">
          {hashtag.map((el) => (
            <span key={el} className="mr-1">
              #{el}
            </span>
          ))}
        </span>
      </div>
    </Link>
  )
}

const hashtag = ["全部", "#javascript", "#html", "#css", "#react", "#vue"]

export default function Blog({ allPosts }: { allPosts: IPost[] }) {
  return (
    <section className="pt-20">
      <div className="mb-6 flex items-center justify-center">
        <ul className="mr-5 flex">
          {hashtag.map((el, id, arr) => (
            <li
              key={id}
              className={classNames("mr-4", {
                "after:ml-6 after:text-zinc-200 after:content-['/']":
                  id < arr.length - 1
              })}
            >
              <span
                data-num="9"
                // className="after:content relative text-zinc-200 underline after:absolute after:-right-3 after:-top-1 after:text-xs after:content-[attr(data-num)]"
                className={classNames(
                  "after:content relative cursor-pointer underline after:absolute after:-right-3 after:-top-1 after:text-xs after:content-[attr(data-num)]",
                  {
                    "text-akred-500": id === 0,
                    "text-zinc-200": id !== 0
                  }
                )}
              >
                {el}
                {/* <span className="absolute -right-4 -top-1 text-xs">10</span> */}
              </span>
            </li>
          ))}
        </ul>
        <button className="gradient-box px-6 py-3">更多標籤</button>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap">
        {allPosts.map((el, id) => (
          <Post
            key={id}
            date={el.date}
            title={el.title}
            excerpt={el.excerpt}
            hashtag={el.hashtag}
            slug={el.slug}
          />
        ))}
      </div>
    </section>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["date", "title", "excerpt", "hashtag", "slug"])

  return {
    props: { allPosts }
  }
}

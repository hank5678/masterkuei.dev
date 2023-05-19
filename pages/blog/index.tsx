import dayjs from "dayjs"
import Link from "next/link"
import { getAllPosts } from "@/lib/api"
import classNames from "classnames"
import { useState, useMemo } from "react"

interface IPost {
  date: string
  title: string
  excerpt: string
  slug: string
  hashtag: string[]
}

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

export default function Blog({
  allPosts,
  hashtag
}: {
  allPosts: IPost[]
  hashtag: { name: string; count: number }[]
}) {
  const [selectedHashtag, setSelectedHashtag] = useState("全部")
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      if (selectedHashtag === "全部") {
        return allPosts
      } else {
        return post.hashtag.includes(selectedHashtag)
      }
    })
  }, [selectedHashtag, allPosts])

  return (
    <section className="mt-32">
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
                data-num={el.count}
                onClick={() => {
                  setSelectedHashtag(el.name)
                }}
                className={classNames(
                  "after:content relative cursor-pointer transition-colors duration-300 after:absolute after:-right-3 after:-top-1 after:text-xs after:content-[attr(data-num)] hover:underline",
                  {
                    "text-akblue-500": el.name === selectedHashtag,
                    "text-zinc-200": el.name !== selectedHashtag
                  }
                )}
              >
                {el.name}
              </span>
            </li>
          ))}
        </ul>
        {/* <button className="gradient-box px-6 py-3">更多標籤</button> */}
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap">
        {filteredPosts.map((el, id) => (
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
  const hashtag = [
    { name: "全部", count: allPosts.length },
    ...allPosts
      .map((el) => el.hashtag)
      .reduce<string[]>((acc, cur) => [...acc, ...cur], [] as string[])
      .reduce((acc, cur, id, arr) => {
        if (acc.some((el) => el.name === cur)) {
          return acc.map((el) => {
            if (el.name === cur) {
              return { ...el, count: el.count + 1 }
            } else {
              return el
            }
          })
        } else {
          return [...acc, { name: cur, count: 1 }]
        }
      }, [] as { name: string; count: number }[])
  ].sort((a, b) => b.count - a.count)

  console.log(hashtag)
  return {
    props: { allPosts, hashtag }
  }
}

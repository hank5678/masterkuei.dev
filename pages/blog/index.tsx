import dayjs from "dayjs"
import Link from "next/link"
import { getAllPosts } from "@/lib/api"
import classNames from "classnames"
import { useState, useMemo, useEffect } from "react"
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion"

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
    <Link as={`/blog/${slug}`} href="/blog/[slug]" className="w-full">
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

  const [scope, animate] = useAnimate()

  const updateHashtag = async (name: string) => {
    await animate(
      ".hanktest",
      { opacity: [1, 0], x: [0, 30], y: [0, 30] },
      {
        duration: 0.3,
        delay: stagger(0.1, { startDelay: 0.15 })
      }
    )
    setSelectedHashtag(name)

    // await animate(
    //   "a",
    //   { opacity: [0, 1] },
    //   { duration: 0.3, delay: stagger(0.1, { startDelay: 0.15 }) }
    // )
  }

  useEffect(() => {
    animate(
      ".hanktest",
      { opacity: [0, 1], x: [-30, 0], y: [-30, 0] },
      { duration: 0.3, delay: stagger(0.1, { startDelay: 0.15 }) }
    )
  }, [filteredPosts])

  return (
    <section className="mt-32">
      {/* <button onClick={test}>test</button> */}
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
                  updateHashtag(el.name)
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
      <div className="mx-auto flex w-full max-w-5xl flex-wrap" ref={scope}>
        {filteredPosts.map((el, id) => (
          <div className="hanktest relative w-1/2 p-5" key={el.title}>
            <Post
              date={el.date}
              title={el.title}
              excerpt={el.excerpt}
              hashtag={el.hashtag}
              slug={el.slug}
            />
          </div>
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

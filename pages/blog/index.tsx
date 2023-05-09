import dayjs from "dayjs"
import Link from "next/link"
import { getAllPosts } from "@/lib/api"
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
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <div className="my-16">
        <p className="text-xs text-zinc-200">
          <span className="mr-3">{dayjs(date).format("YYYY/MM/DD")}</span>
          <span className="text-zinc-200">
            {hashtag.map((el) => (
              <span key={el} className="mr-1">
                #{el}
              </span>
            ))}
          </span>
        </p>
        <p className="text-4xl text-zinc-200 gradient-underline-text font-bold mb-2">
          <span className="inline-block relative">{title}</span>
        </p>
        <p className="text-base text-zinc-200">{excerpt}</p>
      </div>
    </Link>
  )
}

export default function Blog({ allPosts }: { allPosts: IPost[] }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div>
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
    </div>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["date", "title", "excerpt", "hashtag", "slug"])

  return {
    props: { allPosts }
  }
}

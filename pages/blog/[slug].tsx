import { getAllPosts, getPostBySlug } from "@/lib/api"
import markdownToHtml from "@/lib/markdownToHtml"
import markdownStyles from "./markdown-styles.module.css"

type Author = {
  name: string
  picture: string
}

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Page({ post, morePosts, preview }: Props) {
  return (
    <article className="w-full h-full">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-zinc-200">{post.title}</h1>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])
  console.log(posts)
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "hashtag"
  ])
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

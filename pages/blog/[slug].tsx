import { getAllPosts, getPostBySlug } from "@/lib/api"
import ReactMarkdown from "react-markdown"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { monokaiSublime as syntaxStyle } from "react-syntax-highlighter/dist/cjs/styles/hljs"

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
    <>
      <article className="mt-32 h-full w-full">
        <div className="mx-auto w-full max-w-7xl text-base text-zinc-200">
          <h1 className="mb-10 text-center text-4xl font-bold">{post.title}</h1>
          <ReactMarkdown
            components={{
              h2: ({ node, className, children, ...props }) => {
                return (
                  <h2 className="mb-6 mt-16 text-3xl font-bold leading-7">
                    {children}
                  </h2>
                )
              },
              p: ({ node, className, children, ...props }) => {
                return <p className="mb-6 leading-7">{children}</p>
              },
              ul: ({ node, className, children, ...props }) => {
                return <ul className="mb-6 ml-8 list-disc">{children}</ul>
              },
              ol: ({ node, className, children, ...props }) => {
                return <ul className="mb-6 ml-8 list-decimal">{children}</ul>
              },
              li: ({ node, className, children, ...props }) => {
                return <li className="mb-2">{children}</li>
              },
              hr: ({ node, className, children, ...props }) => {
                return <hr className="my-8">{children}</hr>
              },
              a: ({ node, className, children, ...props }) => {
                return (
                  <a
                    {...props}
                    target="_blank"
                    className="text-akblue-500 hover:underline"
                  >
                    {children}
                  </a>
                )
              },
              pre: ({ node, className, children, ...props }) => {
                return <pre className="mb-6">{children}</pre>
              },
              strong: ({ node, className, children, ...props }) => {
                return <strong className="font-bold">{children}</strong>
              },
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    showLineNumbers={true}
                    style={syntaxStyle}
                    language={match[1]}
                    customStyle={{ borderRadius: 6 }}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    {...props}
                    className="rounded-md bg-[rgb(35,36,31)] px-2 py-1"
                  >
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
          {/* <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post.content }}
        /> */}
        </div>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

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
  // const content = await markdownToHtml(post.content || "")

  return {
    props: {
      post
    }
  }
}

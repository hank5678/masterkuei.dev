interface IPost {
  date: string
  title: string
  caption: string
  hashtags: string[]
}

const Post = ({
  date = "",
  title = "",
  caption = "",
  hashtags = []
}: IPost) => {
  return (
    <div className="my-16">
      <p className="text-xs text-zinc-200">
        <span className="mr-3">{date}</span>
        <span className="text-zinc-200">
          {hashtags.map((el) => (
            <span key={el} className="mr-1">
              #{el}
            </span>
          ))}
        </span>
      </p>
      <p className="text-4xl text-zinc-200 gradient-underline-text font-bold mb-2">
        <span className="inline-block relative">{title}</span>
      </p>
      <p className="text-base text-zinc-200">{caption}</p>
    </div>
  )
}

const posts: IPost[] = [
  {
    date: "2023/01/01",
    title: "React vs Vue 就是要對決",
    caption: "到底有什麼差別？學哪一個才好？",
    hashtags: ["reactjs", "vuejs"]
  },
  {
    date: "2023/01/01",
    title: "const vs let 就是要對決",
    caption: "var: 那我走？",
    hashtags: ["javascript"]
  },
  {
    date: "2023/01/01",
    title: "前端工程師的價值",
    caption: "本來我想做設計的，直到我的膝蓋中了一箭",
    hashtags: ["心得雜談"]
  }
]

export default function Blog() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div>
        {posts.map((el, id) => (
          <Post key={id} {...el} />
        ))}
      </div>
    </div>
  )
}

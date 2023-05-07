export default function Home() {
  return (
    <>
      <div className="text-g flex flex-col items-center absolute-center">
        <h1 className="text-9xl glitch-text mb-6" data-text="masterkuei.dev">
          masterkuei.dev
        </h1>
        <p className="text-sm mb-4 text-zinc-200 ">
          {
            '{name: "蔡貴翰", from: "Taipei", career: "frontend developer", email: "hank5678tw@gmail.com"}'
          }
        </p>
        <p className="text-center text-zinc-100">
          <span className="inline-block align-middle">
            我叫蔡貴翰，前端工作經驗12年
          </span>
          <br />
          <span className="inline-block align-middle">
            在前端工程師一詞未普及以前，就已經確定它是我的志向
          </span>
          <br />
          <span className="inline-block align-middle">
            小時因為電玩的關係，建立了我第一個網站
          </span>
          <br />
          <span className="inline-block align-middle mb-4">
            因此開啟我對網站開發的熱忱，直到現在沒有變
          </span>
          <br />
          <span className="inline-block align-middle mr-3">
            如果想知道更多，可以
          </span>
          <a
            role="button"
            className="px-5 py-3 text-2xl inline-block button align-middle text-zinc-900"
          >
            <span className="relative">和我聊聊</span>
          </a>
        </p>
      </div>
    </>
  )
}

import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  return <p>blog: {router.query.id}</p>
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
//     fallback: false // can also be true or 'blocking'
//   }
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps(context) {
//   return {
//     // Passed to the page component as props
//     props: { post: {} }
//   }
// }

import Link from "next/link"

export default function Index() {
  return <>
    <Link href={ { pathname: "/catalog/category" } }>Category List</Link>
  </>
}
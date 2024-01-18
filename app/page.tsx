import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={{ pathname: "/catalog" }}>Product Catalog</Link>
    </>
  )
}

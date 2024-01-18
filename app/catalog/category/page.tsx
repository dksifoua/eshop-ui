import CategoryList from "@/components/CategoryList"
import { ColumnDef } from "@tanstack/table-core";

type Category = {
  name: String,
  description: String,
}

const categories: Category[] = [
  {
    name: "Electronics",
    description: "Find the latest in consumer electronics, from smartphones to laptops."
  },
  {
    name: "Home & Garden",
    description: "Everything you need for your home and outdoor spaces."
  },
  {
    name: "Beauty & Health",
    description: "Products for personal care, beauty, and wellness."
  }
]

const columnDefinition: ColumnDef<Category>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
]

export default function Page() {

  return <>
    <CategoryList columns={columnDefinition} data={categories} />
  </>
}
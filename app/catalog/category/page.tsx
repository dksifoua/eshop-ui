import CategoryList from "@/components/catalog/CategoryList"
import categoryService from "@/api/catalog/category"
import { columnDefinition } from "@/app/catalog/category/columns";

export default async function Page() {
  const categories = await categoryService.getCategories()

  return <>
    <CategoryList columns={ columnDefinition } data={ categories } filterColumn="name"/>
  </>
}
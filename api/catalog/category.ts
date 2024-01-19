import categories from "@/data/categories.json"

export interface Category {
  name: string,
  description: string,
  parentCategory?: string | null,
}

const categoryService = {
  addCategory: async function(category: Category): Promise<void> {
    console.log(category)
  },
  getCategories: async function(): Promise<Category[]> {
    return categories
  }
}
export default categoryService
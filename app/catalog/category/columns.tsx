"use client"

import { ColumnDef } from "@tanstack/table-core";
import { Category } from "@/api/catalog/category";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columnDefinition: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description"
  },
]
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import CategoryAdd from "@/components/catalog/CategoryAdd"

export default function CategoryList<TData, TValue>(
  {
    columns,
    data,
    filterColumn,
  }: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    filterColumn: string,
  }
) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  })

  return <>
    <h1>Category List</h1>
    <CategoryAdd />
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter category..."
        value={ (table.getColumn(filterColumn)?.getFilterValue() as string) ?? "" }
        onChange={ (event) =>
          table.getColumn(filterColumn)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          { table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={ headerGroup.id }>
              { headerGroup.headers.map((header) => {
                return (
                  <TableHead key={ header.id }>
                    { header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) }
                  </TableHead>
                )
              }) }
            </TableRow>
          )) }
        </TableHeader>
        <TableBody>
          { table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={ row.id }
                data-state={ row.getIsSelected() && "selected" }
              >
                { row.getVisibleCells().map((cell) => (
                  <TableCell key={ cell.id }>
                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                  </TableCell>
                )) }
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={ columns.length } className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={ () => table.previousPage() }
        disabled={ !table.getCanPreviousPage() }
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={ () => table.nextPage() }
        disabled={ !table.getCanNextPage() }
      >
        Next
      </Button>
    </div>
  </>
}
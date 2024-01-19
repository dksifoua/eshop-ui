"use client"

import * as z from "zod"
import categoryService from "@/api/catalog/category"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Category name must be at least 5 characters",
  }).max(50, {
    message: "Category name must be at most 50 characters",
  }),
  description: z.string().min(5, {
    message: "Category description must be at least 5 characters",
  }).max(256, {
    message: "Category description must be at most 256 characters",
  }),
})

export default function CategoryAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  })
  const [open, setOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    categoryService.addCategory(values).then(() => setOpen(false))
    form.reset()
  }

  return <>
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category in the product catalog.
          </DialogDescription>
        </DialogHeader>
        <Form { ...form }>
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            onReset={ () => setOpen(false) }
            id="addForm"
            className="space-y-8"
          >
            <FormField
              control={ form.control }
              name="name"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" { ...field } />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              ) }
            />
            <FormField
              control={ form.control }
              name="description"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category description" { ...field } />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              ) }
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="addForm" type="reset" variant="destructive">Discard</Button>
          <Button form="addForm" type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
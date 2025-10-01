"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.email(),
})

export default function FormForgetPassword() {
  const route = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    

  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-96 flex items-center jusitfy-center p-4 rounded-2xl shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 py-6 px-3">
            <p className="text-3xl font-light flex justify-center">Quên mật khẩu</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6 bg-blue-600 text-lg hover:bg-blue-500/80">Quên mật khẩu</Button>
            <div className="text-sm flex justify-center">
              <strong className="hover:text-blue-600 hover:underline cursor-pointer ml-1 " onClick={() => route.push('/login')}>
                Đăng nhập ngay!
              </strong>
            </div>
          </form>
          <Toaster richColors />
        </Form>
      </div>
    </div>

  )
}

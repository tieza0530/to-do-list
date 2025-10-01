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
import { useState } from "react"
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  account: z.string(),
  password: z.string()
})

export default function FormLogin() {
  const [show, setShow] = useState(false)
  const route = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.password.length || !data.account.length) {
      return toast.error("Vui lòng nhập tài khoản và mật khẩu!", { duration: 1000 })
    } else if (data.password.length < 6 || data.password.length > 30) {
      return toast.error("Vui lòng kiểm tra lại mật khẩu!", { duration: 1000 })
    } else {
      toast.success("Đăng nhập thành công", {
        description: `Chào mừng ${data.account}`,
        duration: 2000,
      })
    }

  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white w-96 flex items-center jusitfy-center p-4 rounded-2xl shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 py-6 px-3">
            <p className="text-3xl font-light flex justify-center">Đăng nhập</p>
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Tài khoản</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tài khoản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input type={show ? "text" : "password"} placeholder="Nhập mật khẩu" {...field} />
                      <div className="absolute right-2" onClick={() => setShow(!show)}>{show ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="flex text-xs justify-end cursor-pointer hover:text-blue-600 hover:underline " onClick={() => route.push('/forget-password')}>Quên mật khẩu ?</p>
            <Button type="submit" className="w-full p-6 bg-blue-600 text-lg hover:bg-blue-500/80">Đăng nhập</Button>
            <div className="flex justify-center items-end">
             <span className="text-xs"> Bạn chưa có tài khoản {" "}</span>
              <strong className="text-sm hover:text-blue-600 hover:underline cursor-pointer ml-1 " onClick={() => route.push('/register')}>
                Đăng ký ngay!
              </strong>
            </div>
          </form>
          <Toaster richColors />
        </Form>
      </div>
    </div>

  )
}

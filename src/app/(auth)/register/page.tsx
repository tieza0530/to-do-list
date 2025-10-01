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
    email: z.email({ message: "Email không hợp lệ" }),
    account: z
        .string()
        .min(4, "Tài khoản tối thiểu 4 ký tự")
        .max(20, "Tài khoản tối đa 20 ký tự")
        .regex(/^[a-zA-Z0-9_]+$/, "Chỉ cho phép chữ, số và dấu gạch dưới"),
    password: z
        .string()
        .min(6, "Mật khẩu ít nhất 6 kí tự!")
        .max(30, "Tài khoản tối đa 30 ký tự")
        .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
        .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
        .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
    passwordAgain: z
        .string()
        .min(6, "Mật khẩu ít nhất 6 kí tự!")
        .max(30, "Tài khoản tối đa 30 ký tự")
        .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
        .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
        .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt")
})
    .refine((data) => data.password === data.passwordAgain, {
        message: "Mật khẩu nhập lại không khớp!",
        path: ["passwordAgain"],
    });


export default function FormRegister() {
    const [show, setShow] = useState(false)
    const [showAgain, setShowAgain] = useState(false)
    const route = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            account: "",
            password: "",
            passwordAgain: "",
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
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white w-96 flex items-center jusitfy-center p-4 rounded-2xl shadow-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 py-6 px-3">
                        <p className="text-3xl font-light flex justify-center">Đăng Ký</p>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Email </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                <FormItem>
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
                        <FormField
                            control={form.control}
                            name="passwordAgain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center relative">
                                            <Input type={showAgain ? "text" : "password"} placeholder="Nhập lại mật khẩu" {...field} />
                                            <div className="absolute right-2" onClick={() => setShowAgain(!showAgain)}>{showAgain ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full p-6 bg-blue-600 text-lg hover:bg-blue-500/80">Đăng ký</Button>
                        <div className=" flex justify-center items-end">
                            <span className="text-xs">Bạn đã có tài khoản  {" "}</span>
                            <strong className="text-sm hover:text-blue-600 hover:underline cursor-pointer ml-1 " onClick={() => route.push('/login')}>
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

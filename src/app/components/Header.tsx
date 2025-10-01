"use client"
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
    const route = useRouter()
    const path = usePathname()
    return (
        <div className="w-screen bg-white py-8">
            <div className="flex justify-around items-center">
                <div className="font-bold flex justify-center items-center" onClick={() => route.push('/')}>
                    <SidebarTrigger />
                    <span>TODOLIST</span>
                </div>
                <div>

                </div>
                <div>
                    {path === '/login' || path === '/forget-password' ?
                        <Button className="bg-blue-600 hover:bg-blue-500/80 rounded-3xl" onClick={() => route.push('/register')}>Đăng ký</Button> :
                        <Button className="bg-blue-600 hover:bg-blue-500/80 rounded-3xl" onClick={() => route.push('/login')}>Đăng nhập</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;
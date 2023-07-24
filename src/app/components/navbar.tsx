"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Database } from "@/models/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User, UserResponse } from "@supabase/supabase-js";
import IconUser from "./icons/UserIcon";
import { useRouter } from "next/navigation";
import IconLogoutBoxLine from "./icons/logout";

export default function Navbar(){
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [user, setUser] = useState<User | undefined>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(()=>{
        const getUser = async () => {
            if (!user){
                const {data,error}:UserResponse = await supabase.auth.getUser()
                if (data.user){
                    setUser(data.user)
                }
            }
        }
        getUser()
    },[user,supabase,isOpen])
    
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleSession = async () => {
        const {error} = await supabase.auth.signOut()
        if (error){
            alert(error.message)
        }
        router.refresh()
    }

    return (
        <nav className="flex w-screen h-[65px] bg-customBlack justify-between py-[5px] px-[20px] items-center p-5">
            <Link href={'https://intec.edu.do'} prefetch={false}>
                <Image src={'/logo-intec.png'} alt={'intec logo'} width={75} height={25} priority className="w-auto h-auto"/>
            </Link>
            <button className="flex items-center justify-between text-white gap-2 focus:outline-none" onClick={handleClick}><IconUser/>{user?.email?.split("@")[0]}</button>
            <div className={`absolute z-20 flex flex-col w-[140px] h-[100px] bg-[#282C31] text-white text-sm items-center right-0 top-[60px] p-[15px] gap-4 rounded-bl-md ${isOpen ? "" : "hidden"}`} onMouseLeave={handleClick}>
                <Link href={"/perfil"} className="flex items-center gap-1 w-full"><IconUser/>Ver perfil</Link>
                <button className="flex items-center gap-1 w-full" onClick={handleSession}><IconLogoutBoxLine/>Cerrar Sesión</button>
            </div>
        </nav>
        
    )
}
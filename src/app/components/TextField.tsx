import { type } from "os"
import React from "react"

type TextFieldProps = {
    isPassword: boolean
    icon: React.ReactNode
    placeholder: string
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}
export default function TextField({isPassword = false, icon,placeholder,onChange}:TextFieldProps) {
    return (
    <div className="flex relative items-center h-[35px] w-fit p-5 ">
        {icon}
        <input type={isPassword ? "password":"text"} className="bg-[#EBE4E4] text-customBlack h-full w-full min-w-[350px] rounded-[5px] pl-10 p-5 focus:outline-none" onChange={onChange} placeholder={placeholder}/>
    </div>
    )
}
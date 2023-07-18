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
    <div className="flex items-center h-[35px] w-full max-w-[350px] p-5 ">
        {icon}
        <input type={isPassword ? "password":"text"} className="bg-[#EBE4E4] text-customBlack h-full w-full rounded-[5px] pl-10 p-5 focus:outline-none" onChange={onChange} placeholder={placeholder}/>
    </div>
    )
}
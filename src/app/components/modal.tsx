"use client"

import { useState } from "react"

type ModalProps = {
    visible:boolean
    children:React.ReactNode
}

export default function Modal({visible = false,children}:ModalProps){
    const [isActive,setIsActive]=useState<boolean>(visible)

    return (<div className={`absolute z-10 h-screen w-screen bg-customBlack opacity-60 ${isActive ? "hidden":""}`}>
        {children}
    </div>
    )
}
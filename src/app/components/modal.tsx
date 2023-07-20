"use client"

import { useState } from "react"

type ModalProps = {
    children:React.ReactNode
}

export default function Modal({children}:ModalProps){

    return (<div className={`absolute top-0 left-0 z-10 flex h-screen w-screen justify-center items-center bg-[rgba(0,0,0,0.6)]`} >
        <div className="h-fit w-fit opacity-100 bg-white rounded-[10px]">
            {children}
        </div>
    </div>
    )
}
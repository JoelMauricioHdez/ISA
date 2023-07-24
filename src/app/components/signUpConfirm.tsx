'use client'

import CustomButton from "./Button"
import { redirect, useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'


export default function ConfirmationComponent(){
    const router = useRouter()
    const params = useSearchParams()
    const confirmationUrl = params.get("confirmation_url")

    const handleRedirect = () => {
        redirect("/login")
    }

    const handleConfirmation = () => {
        if (confirmationUrl){

        }
        console.log(confirmationUrl)
    }

    return (        
        <div className="flex flex-col items-center min-h-full h-[495px] max-h-full p-20 w-4/5 bg-[rgba(255,255,255,.8)] rounded-[15px] gap-[30px] last:justify-center-center">
            <h1 className="text-customRed font-bold text-lg text-center">Sistema de Reporte de Inconvenientes de Selección</h1>
            <div className="w-full h-full flex justify-center items-center">
                <CustomButton onClick={handleConfirmation} text={"Confirma tu correo"} className="!w-[350px]"/>
            </div>
        </div>
    )
}
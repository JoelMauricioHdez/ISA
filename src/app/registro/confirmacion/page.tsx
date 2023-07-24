'use client'
import Image from "next/image"
import AuthForm from "../../components/auth"
import ConfirmationComponent from "@/app/components/signUpConfirm"

export default function Home(){
    return (
        <main className="fixed w-full h-full p-10 flex justify-center">
            {/* background */}
            <Image src={'/signupbg.jpg'} className="-z-10" alt="background" fill priority/>

            {/* add Auth component to handle login */}
            <ConfirmationComponent/>

            {/* INTEC's logo on the corner */}
            <Image className="absolute right-0 bottom-0 max-w-auto max-h-auto" src={'/intec-logo.png'} alt="logo" width={175} height={150} priority/>
        </main>
    )
}
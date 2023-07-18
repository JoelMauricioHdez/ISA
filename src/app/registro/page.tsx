'use client'
"use client"
import Image from "next/image"
import AuthForm from "../components/auth"

export default function Home(){
    return (
        <main>
            {/* background */}
            <Image src={'/signupbg.jpg'} className="-z-10" alt="background" fill priority/>

            {/* add Auth component to handle login */}
            <AuthForm isSignUp={false}/>

            {/* INTEC's logo on the corner */}
            <Image className="absolute right-0 bottom-0" src={'/intec-logo.png'} alt="logo" width={175} height={150} priority/>
        </main>
    )
}
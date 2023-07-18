'use client'
import Image from "next/image"
import AuthForm from "../components/auth"

export default function Home(){
    return (
        <main className="p-5 pl-[6rem]">
            {/* background */}
            <Image src={'/loginbg.jpg'} alt="background" className="-z-10" fill priority/>

            {/* add Auth component to handle login */}
            <AuthForm isSignUp/>

            {/* INTEC's logo on the corner */}
            <Image className="absolute right-0 bottom-0" src={'/intec-logo.png'} alt="logo" width={175} height={150} priority/>
        </main>
    )
}
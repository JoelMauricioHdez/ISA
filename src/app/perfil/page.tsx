'use client'

import IconUser from "../components/icons/UserIcon"
import Navbar from "../components/navbar"

export default function Home(){
    return (
        <main className="flex h-screen w-screen flex-col items-center ">
            <Navbar isProfile={true}/>
            <section className='flex  h-full md:w-[80%] p-10 gap-[5px] overflow-hidden w-full'>
                    <div className="flex flex-col w-full  h-full border-[#ebebeb]  text-customBlack border-2 p-5 rounded-md items-center">
                        <IconUser className="w-[5rem] h-[5rem]"/>
                        <span className="text-lg font-semibold">Mi perfil</span>
                        <div className="w-[80%] h-full flex flex-col">
                             
                        </div>
                    </div>
            </section>
        </main>
    )
}
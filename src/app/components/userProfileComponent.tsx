"use client"

import { Database } from "@/models/supabase"
import CustomButton from "./Button"
import TextField from "./TextField"
import IconUser from "./icons/UserIcon"
import IconGraduationCap from "./icons/CarreraIcon"
import IconFilePaperFill from "./icons/pensumIcon"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type userProfileCompProps = {
    usuario:Database["public"]["Tables"]["Estudiante"]["Row"]|undefined
    onClick: (param:any) => void
}

const supabase = createClientComponentClient()

export default function UserProfileComponent({usuario,onClick}:userProfileCompProps){
    const [nombre, setNombre] = useState<string|null>(null)
    const [apellido,setApellido] = useState<string|null>(null)
    const [pensum,setPensum] = useState<string>("2020")
    const [carrera,setCarrera] = useState<number|null>(null)


    const handleCLick = async () => {
            const {data,error} = await supabase.from("Estudiante")
                .update<Database["public"]["Tables"]["Estudiante"]["Update"]>({nombre:nombre,apellido:apellido,carrera:carrera,pensum:pensum})
                .eq("uuid",usuario?.uuid)
            if (error) {
                console.log(error)
                alert("ha ocurrido un error")
            }
            if (data){
                alert("datos actualizados correctamente")
            }
    } 

    return (
        <div className="flex h-full w-full min-h-[550px] min-w-[375px] rounded-[5px] p-[15px] justify-center">
            <div className="flex flex-col font-bold gap-[15px] w-full justify-center items-center">
                <span className="font-bold text-xl">Completa tu perfil</span>
                <TextField isPassword={false} icon={<IconUser className="absolute my-auto left-[25px] h-[25px] w-[25px] fill-customBlack"/>} placeholder="nombre" onChange={(e:any)=>{setNombre(e.target.value.toString())}}/>
                <TextField isPassword={false} icon={<IconUser className="absolute my-auto left-[25px] h-[25px] w-[25px] fill-customBlack"/>} placeholder="apellido" onChange={(e:any)=>{setApellido(e.target.value.toString())}}/>
                {/* agregar selects para la carrera y el pensum */}
                <TextField isPassword={false} icon={<IconGraduationCap className="absolute my-auto left-[25px] h-[25px] w-[25px] fill-customBlack"/>} placeholder="carrera" onChange={(e:any)=>{setCarrera(e.target.value.toString())}}/>
                <TextField isPassword={false} icon={<IconFilePaperFill className="absolute my-auto left-[25px] h-[25px] w-[25px] fill-customBlack"/>} placeholder="pensum" onChange={(e:any)=>{setPensum(e.target.value.toString())}}/>
                <CustomButton text="Actualizar mi perfil" onClick={handleCLick} className="!w-[350px]"/>
                <button onClick={onClick} className="font-semibold text-customRed px-2">Terminar m&aacute;s tarde</button>
            </div>
        </div>
    )
}
"use client"

import { useState } from "react"
import IconBxsPencil from "./icons/EditIcon"
import Modal from "./modal"
import { Database } from "@/models/supabase"
import TextField from "./TextField"
import SelectField from "./select"
import IconDelete from "./icons/Delete"
import CustomButton from "./Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

type CardEditProps = {
    trimestre:string
    estudiante:Database["public"]["Tables"]["Estudiante"]["Row"]|undefined
    onClick: (param:any) => void
}

export default function CreateCard({trimestre,estudiante,onClick}:CardEditProps){
    const [description,setDescription] = useState<string|undefined>()
    const [tipoInconveniente,setTipoInconveniente] = useState<number>(1)
    const [asignatura,setAsignatura] = useState<number>(1)


    const handleText = (value:string) => {
        setDescription(value)
    }

    const handleSelect = (value:any)=>{
        setTipoInconveniente(value)
    }

    const handleSelect2 = (value:any)=>{
        setAsignatura(value)
    }

    const handleCreate = async () => {
        const {data,error} = await supabase.from("Inconvenientes").insert<Database["public"]["Tables"]["Inconvenientes"]["Insert"]>({asignatura:asignatura,descripcion:description,tipo_inconveniente:tipoInconveniente,estudiante:estudiante?.id!,trimestre:trimestre}).select()
        if (error){
            console.log(error)
            alert("Ha ocurrido un error")
        }
        if (data){
            alert("Su Reporte se creó correctamente")
        }
    }



    return (
        <div className="flex flex-col h-full w-full min-h-[335px] max-w-[675px] border-customBlack rounded-[5px] border-2 p-[15px] justify-between">
                <div className="flex flex-col font-bold gap-2">
                    <div className="flex justify-between ">
                        <span className="">Nuevo Reporte</span>
                    </div>
                    <SelectField className="text-customRed" type="tipo" onChange={(e)=>{handleSelect(e.target.value)}} default_v={0}/>
                    <SelectField className="font-semibold" type="asignaturas" onChange={(e)=>{handleSelect2(e.target.value)}} default_v={0}/>
                    <textarea
                        onChange={(e) => handleText(e.target.value)}
                        className="bg-[#EBE4E4] text-customBlack font-normal resize-none h-[130px] w-full rounded-[2px] p-2 pl-2 focus:outline-none" 
                        placeholder={`Descripción:`}
                    />
                </div>
                <div className="flex justify-between">
                    <button onClick={onClick} className="font-semibold px-2">Cancelar</button>
                    <CustomButton text="Crear" onClick={handleCreate} className="!w-[125px]"/>
                </div>
           </div>
    )
}
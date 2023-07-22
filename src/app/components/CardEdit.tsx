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
    report:Database["public"]["Views"]["vw_report_info"]["Row"]|null
    onClick: (param:any) => void
}

export default function EditCard({report,onClick}:CardEditProps){
    const [description,setDescription] = useState<string|undefined>(report?.Descripción?.toString())
    const [newTipoInconveniente,setNewTipoInconveniente] = useState<number>()

    const handleText = (value:string) => {
        setDescription(value)
    }

    const handleSelect = (value:any)=>{
        setNewTipoInconveniente(value)
    }

    const handleUpdate = async () => {
        const {data,error} = await supabase.from("Inconvenientes").update({descripcion:description,tipo_inconveniente:newTipoInconveniente}).eq("codigo",report?.Codigo).select()
        if (error){
            console.log(error)
            alert("Ha ocurrido un error")
        }
        if (data){
            console.log(data)
            alert("Reporte actualizado correctamente")
        }
    }

    const handleDelete = async () => {
        if(confirm("seguro que desea borrar este reporte? ")){
            alert("no se ha implementado esta función")
        }
        else{
            return
        }
    }

    return (
        <div className="flex flex-col h-full w-full min-h-[335px] max-w-[675px] border-customBlack rounded-[5px] border-2 p-[15px] justify-between">
                <div className="flex flex-col font-bold gap-2">
                    <div className="flex justify-between ">
                        <span className="">#{report?.Codigo}</span>
                        <div className="flex gap-2">
                            <button onClick={handleDelete} className="text-customRed "><IconDelete className="w-[24px] h-[24px]"/></button>
                        </div>
                    </div>
                    <SelectField className="text-customRed" type="tipo" onChange={(e)=>{handleSelect(e.target.value)}} default_v={report?.Tipo_Inconveniente}/>
                    <span className="font-semibold w-4/5">{report?.Asignatura}</span>
                    <textarea
                        onChange={(e) => handleText(e.target.value)}
                        className="bg-[#EBE4E4] text-customBlack font-normal resize-none h-[130px] w-full rounded-[2px] p-2 pl-2 focus:outline-none" 
                        placeholder={`Descripción:\n${description}`}
                    />
                </div>
                <div className="flex justify-between">
                    <button onClick={onClick} className="font-semibold px-2">Cancelar</button>
                    <CustomButton text="Guardar" onClick={handleUpdate} className="!w-[175px]"/>
                </div>
           </div>
    )
}
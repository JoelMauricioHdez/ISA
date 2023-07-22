"use client"

import { Database } from "@/models/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { report } from "process"
import { useEffect, useState } from "react"

type SelectFieldProps={
    type:"tipo"|"asignaturas"
    default_v:any
    onChange?:(e:any)=>void
    className:String|null
}

const supabase = createClientComponentClient()

export default function SelectField({type,className,default_v,onChange}:SelectFieldProps){
    const [options, setOptions] = useState<any>([])

    useEffect(()=>{
        const getOptions = async () => {
        if (type == "tipo") {
                const {data,error} = await supabase.from("Tipo_Inconveniente").select("*")
                if (error){
                    console.log(error)
                }
                setOptions(data)
        }
        else if (type == "asignaturas") {
                const {data,error} = await supabase.from("Asignatura").select("*")
                if (error){
                    console.log(error)
                }
                setOptions(data)
        }
    }
        getOptions()
    },[options,type])

    return (
        <select className={`border-0 focus:outline-none appearance-none ${className}`} onChange={onChange} >
            { 
            type == "asignaturas" ? 
            options.map((option:Database["public"]["Tables"]["Asignatura"]["Row"],index:any)=>(
                <option key={index} value={option.id} className="text-customBlack " >
                    {`${option?.codigo_asignatura} - ${option.nombre}`}
                </option>
            ))
            : options.map((option:Database["public"]["Tables"]["Tipo_Inconveniente"]["Row"],index:any)=>(
                <option key={index} value={option.id} className="text-customBlack" selected={option.nombre == default_v}>{option.nombre}</option>
            ))}
        </select>
    )
}
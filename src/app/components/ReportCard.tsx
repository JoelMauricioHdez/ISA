"use client"

import { useState } from "react"
import IconBxsPencil from "./icons/EditIcon"
import Modal from "./modal"
import EditCard from "./CardEdit"
import { Database } from "@/models/supabase"

type ReportCardProps = {
    report:Database["public"]["Views"]["vw_report_info"]["Row"]|null
}

export default function ReportCard({report}:ReportCardProps){
    const [isOpen,setOpen] = useState<boolean>(false)

    const handleCLick = () => {
        setOpen(!isOpen)
    }
    
    return (<div className="flex flex-col h-full w-full max-h-[175px] max-w-[330px] bg-white border-customBlack rounded-[5px] border-2 p-[10px] justify-between">
        <div className="flex flex-col font-bold">
            <div className="flex justify-between ">
                <span className="">#{report?.Codigo}</span>
                <button onClick={handleCLick}><IconBxsPencil/></button>
            </div>
            <span className="text-customRed">{report?.Tipo_Inconveniente}</span>
            <span className="font-semibold">{report?.Asignatura}</span>
        </div>
        <span className="w-full text-right">{report?.Fecha}</span>
        {
            isOpen ? 
                <Modal>
                    <EditCard report={report} onClick={handleCLick}/>
                </Modal>
                : null 
        }
        
        
    </div>)
}
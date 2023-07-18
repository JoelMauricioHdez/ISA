"use client"

import IconBxsPencil from "./icons/EditIcon"

type ReportCardProps = {
    codigo:string
    tipoInconveniente:string
    asignatura:string
    fecha:string
}

export default function ReportCard({codigo,tipoInconveniente,asignatura,fecha}:ReportCardProps){
    return (<div className="flex flex-col h-full w-full min-h-[175px] max-w-[335px] border-customBlack rounded-[5px] border-2 p-[10px] justify-between">
        <div className="flex flex-col font-bold">
            <div className="flex justify-between ">
                <span className="">#{codigo}</span>
                <button><IconBxsPencil/></button>
            </div>
            <span className="text-customRed">{tipoInconveniente}</span>
            <span className="">{asignatura}</span>
        </div>
        <span className="w-full text-right">{fecha}</span>
    </div>)
}
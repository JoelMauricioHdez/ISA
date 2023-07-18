'use client'
import Image from 'next/image'
import { Database } from '@/models/supabase'
import Navbar from './components/navbar'
import { useEffect, useState } from 'react'
import { time } from 'console'
import CustomButton from './components/Button'
import ReportCard from './components/ReportCard'
import Modal from './components/modal'

export default function Home() {
  const [trimestre,setTrimestre] = useState<string>("")
  const [reportes,setReportes] = useState<Array<Database["public"]["Tables"]["Inconvenientes"]["Row"]>|undefined>([])

  useEffect(()=>{
    const getTrimestre = () => {
      if (trimestre === ""){
        const date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month == 1){
          setTrimestre(`Febrero - Abril ${year}`)
        }
        if (month == 4){
          setTrimestre(`Mayo - Julio ${year}`)
        }
        if(month == 7){
          setTrimestre(`Agosto - Octubre ${year}`)
        }
        if(month == 10){
          setTrimestre(`Noviembre - Enero ${year}`)
        }
      }
    }
    getTrimestre()
  },[trimestre])

  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <Modal visible >
      <ReportCard asignatura='prueba' tipoInconveniente='Falta de Cupo' fecha='18/7/2023' codigo="000000" />

      </Modal>
      <Navbar/>
      <section className='flex flex-col h-full w-[80%] px-5 pt-5 gap-[5px]'>
        <div className='flex flex-col w-full h-full max-h-[120px] rounded-[12px] opacity-90 bg-customRed text-white p-[12px] gap-[5px]'>
          <h1 className='opacity-100 font-bold'>Trimestre {trimestre}</h1>
          <h2 className='opacity-100 font-bold'>Reporte de Inconvenientes de Selección</h2>
        </div>
        <div className='flex flex-col w-full h-full '>
          <div className='flex justify-between items-center py-[10px]'>
          <h3>Mis Reportes</h3>
          <CustomButton text='Crear Reporte' onClick={()=>{}}/>
          </div>
          <div className='flex flex-wrap gap-[5px] overflow-y-auto'>
          <ReportCard asignatura='prueba' tipoInconveniente='Falta de Cupo' fecha='18/7/2023' codigo="000000" />
          <ReportCard asignatura='prueba' tipoInconveniente='Falta de Cupo' fecha='18/7/2023' codigo="000000" />
          <ReportCard asignatura='prueba' tipoInconveniente='Falta de Cupo' fecha='18/7/2023' codigo="000000" />

            {
              reportes?.map((reporte,index)=>(
               <ReportCard key={index} asignatura='prueba' tipoInconveniente='Falta de Cupo' fecha='18/7/2023' codigo="000000" />
              ))
            }
          </div>
        </div>
      </section>
    </main>
  )
}

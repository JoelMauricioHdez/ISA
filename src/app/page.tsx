'use client'
import Image from 'next/image'
import { Database } from '@/models/supabase'
import Navbar from './components/navbar'
import { useEffect, useState } from 'react'
import { time } from 'console'
import CustomButton from './components/Button'
import ReportCard from './components/ReportCard'
import Modal from './components/modal'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import CreateCard from './components/createCard'
import { useRouter } from 'next/navigation'

const supabase = createClientComponentClient()

export default function Home() {
  const router = useRouter()
  const [trimestre,setTrimestre] = useState<string>("")
  const [reportes,setReportes] = useState<any|undefined>([])
  const [isOpen,setOpen] = useState<boolean>(false)

  const handleCLick = () => {
      setOpen(!isOpen)
      if (isOpen == false){
        router.refresh()
      }
  }

  useEffect(()=>{
    const getReports = async () => {
      let {data: user,error: uerror} = await supabase.auth.getUser()
      if(uerror){
        console.log(uerror)
      }
      let { data: vw_report_info, error } = await supabase
      .from('vw_report_info')
      .select('*').eq("Id_Estudiante",user?.user?.email?.split("@")[0])
    
      setReportes(vw_report_info)
    }
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
    getReports()
    getTrimestre()
  },[trimestre,reportes])

  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <Navbar/>
      <section className='flex flex-col h-full w-[80%] px-5 pt-5 gap-[5px]'>
        <div className='flex flex-col w-full h-full max-h-[120px] rounded-[12px] opacity-90 bg-customRed text-white p-[12px] gap-[5px]'>
          <h1 className='opacity-100 font-bold'>Trimestre {trimestre}</h1>
          <h2 className='opacity-100 font-bold'>Reporte de Inconvenientes de Selección</h2>
        </div>
        <div className='flex flex-col w-full h-full '>
          <div className='flex justify-between items-center py-[10px]'>
          <h3>Mis Reportes</h3>
          <CustomButton text='Crear Reporte' className="w-[200px] focus:outline-none" onClick={handleCLick}/>
          </div>
          <div className='flex flex-wrap gap-[5px] overflow-y-auto'>
            {
              reportes?.map((reporte:Database["public"]["Views"]["vw_report_info"]["Row"],index:any)=>(
               <ReportCard key={index} report={reporte} />
              ))
            }
          </div>
        </div>
      </section>
      {
        isOpen ? <Modal>
          <CreateCard onClick={handleCLick}/>
        </Modal>:null
      }
    </main>
  )
}

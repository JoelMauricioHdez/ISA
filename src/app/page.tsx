'use client'
import { Database } from '@/models/supabase'
import Navbar from './components/navbar'
import { useEffect, useState } from 'react'
import CustomButton from './components/Button'
import ReportCard from './components/ReportCard'
import Modal from './components/modal'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import CreateCard from './components/createCard'
import { useRouter } from 'next/navigation'
import { report } from 'process'

const supabase = createClientComponentClient()

export default function Home() {
  const router = useRouter()
  const emptyUser : Database["public"]["Tables"]["Estudiante"]["Row"] = {id:0,id_estudiante:null,nombre:null,apellido:null,correo_institucional:"",carrera:null,pensum:"",uuid:null}
  const [trimestre,setTrimestre] = useState<string>("")
  const [tcode,setTCode] = useState<string>("")
  const [reportes,setReportes] = useState<any|undefined>([])
  const [userData,setUserData] = useState<Database["public"]["Tables"]["Estudiante"]["Row"]>(emptyUser)
  const [isOpen,setOpen] = useState<boolean>(false)

  const handleCLick = () => {
      setOpen(!isOpen)
      if (isOpen == false){
        router.refresh()
      }
  }

  useEffect(()=>{
    const channel = supabase
      .channel('reportes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Inconvenientes'},(payload)=>{getReports(userData)})
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Inconvenientes'}, (payload)=>{getReports(userData)})
      .subscribe()

    const getReports = async (user:Database["public"]["Tables"]["Estudiante"]["Row"]) => {
      let { data: vw_report_info, error } = await supabase
      .from('vw_report_info')
      .select('*').eq("Id_Estudiante",user?.id_estudiante)
      setReportes(vw_report_info)
    }

    const getReportsAndUserData = async () => {
      if (reportes?.length! < 1) {
        let {data: user,error: uerror} = await supabase.auth.getUser()
        if(uerror){
          console.log(uerror)
        }
        let { data: estudiante, error: es_error} = await supabase.from("Estudiante").select("*").eq("uuid",user.user?.id).single()
        getReports(estudiante)
        setUserData(estudiante)
      }
    }

    const getTrimestre = () => {
      if (trimestre === ""){
        const date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month == 1){
          setTrimestre(`Febrero - Abril ${year}`)
          setTCode(`${year}-01`)
        }
        if (month == 4){
          setTrimestre(`Mayo - Julio ${year}`)
          setTCode(`${year}-02`)
        }
        if(month == 7){
          setTrimestre(`Agosto - Octubre ${year}`)
          setTCode(`${year}-03`)
        }
        if(month == 10){
          setTrimestre(`Noviembre - Enero ${year}`)
          setTCode(`${year}-04`)
        }
      }
    }
    getReportsAndUserData()
    getTrimestre()
    return function cleanup(){
      channel.unsubscribe()
    }
  },[trimestre,reportes,tcode,userData])

  return (
    <main className="flex h-screen w-screen flex-col items-center ">
      <Navbar/>
      <section className='flex flex-col h-full w-[80%] px-5 pt-5 gap-[5px] overflow-hidden'>
        <div className='flex flex-col w-full h-full max-h-[120px] rounded-[12px] opacity-90 bg-customRed text-white p-[12px] gap-[5px]'>
          <h1 className='opacity-100 font-bold text-[1.6rem]'>Trimestre {trimestre}</h1>
          <h2 className='opacity-100 font-bold text-[1.1rem]'>Reporte de Inconvenientes de Selección</h2>
        </div>
        <div className='flex flex-col w-full h-full overflow-hidden'>
          <div className='flex justify-between items-center py-[10px]'>
          <h3 className='font-bold'>Mis Reportes</h3>
          <CustomButton text='Crear Reporte' className="!w-[180px] focus:outline-none" onClick={handleCLick}/>
          </div>
          <div className='flex flex-wrap gap-[5px] overflow-y-auto h-4/5 w-full overflow-hidden py-[5px]'>
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
          <CreateCard onClick={handleCLick} trimestre={tcode} estudiante={userData}/>
        </Modal>:null
      }
    </main>
  )
}

'use client'

import { useState } from "react"
import IconEmailOutline from "./icons/EmailIcon"
import TextField from "./TextField"
import IconKey from "./icons/KeyIcon"
import CustomButton from "./Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { AuthResponse, AuthTokenResponse, SignInWithPasswordCredentials } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthProps = {
    isSignUp: boolean
}

type thisAuthError =  {
    isError: boolean
    ErrorMessage: string 
}

export default function AuthForm({isSignUp = false}:AuthProps){
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [email, setEmail] = useState<string>("") 
    const [password, setPassword] = useState<string>("") 
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("") 
    const [error,setError] = useState<thisAuthError>({isError:false,ErrorMessage:""})

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }
    const handleEmailChange = (value: string) => {
        setEmail(value)
    }
    const handlePasswordConfirmationChange = (value: string) => {
        setPasswordConfirmation(value)
    }

    const handleLogin = async () => {
        const {data, error} :any = await supabase.auth.signInWithPassword({email:email,password:password}) 
        if (error){
            console.log(error)
        }
        if (data) {
            router.push('/')
        }
    }

    const handleSignUp = async () => {
        if (!email.match(/[0-9]{7}@est\.intec\.edu\.do/g)){
            let error : thisAuthError = {isError:true,ErrorMessage:"No es un correo válido"}
            setError(error)
            return
        }
        if (password.length >= 8){
            let error : thisAuthError = {isError:true,ErrorMessage:"La contraseña no es valida"}
            setError(error)
            return
        }
        if (password !== passwordConfirmation){
            let error : thisAuthError = {isError:true,ErrorMessage:"Las contraseñas no coinciden"}
            setError(error)
            return
        }
        if (password === passwordConfirmation && password.length >= 8){   
            const {data, error} :any = await supabase.auth.signUp({email:email,password:password})
            if (error){
                console.log(error)
            }
            if (data) {
                router.push('/')
            }
        } else {
        }
    }

    return (        
        <div className="flex flex-col justify-center items-center min-h-full h-[595px] max-h-full w-2/5 bg-[rgba(255,255,255,.8)] rounded-[15px]">
            <h1 className="text-customRed font-bold text-lg text-center">Sistema de Reporte de Inconvenientes de Selección</h1>
            <div className="flex flex-col justify-center items-center h-fit w-fit gap-4">
            <h2 className="text-customBlack font-bold">{isSignUp ? 'Iniciar Sesión' : 'Registrate'}</h2>
            {/* show error message */}
            { error.isError? null : null}
            {/*Textfields */}
            {/* Correo institucional */}
            <TextField placeholder="Correo institucional" isPassword={false} icon={<IconEmailOutline className=" absolute h-[30px] w-[30px] fill-customBlack "/>} onChange={(e:React.FormEvent<HTMLInputElement>) => (handleEmailChange(e.currentTarget.value))}/>
            {/* password */}
            <TextField placeholder="Contraseña" isPassword={true} icon={<IconKey className="p-1 absolute h-[30px] w-[30px] fill-customBlack "/>} onChange={(e:React.FormEvent<HTMLInputElement>) => (handlePasswordChange(e.currentTarget.value))}/>
            {/* confirm password */}
            {
             isSignUp ? 
              null   
             :<TextField placeholder="Confirmar Contraseña" isPassword={true} icon={<IconKey className="p-1 absolute h-[30px] w-[30px] fill-customBlack "/>} onChange={(e:React.FormEvent<HTMLInputElement>) => (handlePasswordConfirmationChange(e.currentTarget.value))}/>
            }
            <CustomButton onClick={isSignUp ? handleLogin : handleSignUp} text={isSignUp ? 'Iniciar Sesión':'Crear Cuenta'}/>
            <span className="text-customBlack font-bold">{isSignUp ? 'No te has registrado? ':'Ya te registraste? '}
                <Link className="text-customRed" href={isSignUp ? '/registro':'/login'}>{isSignUp ? 'Registrate':'Inicia Session'}</Link>
            </span>
            </div>
        </div>
    )
}
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession,editUser } from "../../api/api";

export const AuthContext=createContext()

export const ContextProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [errorLogin,setErrorLogin]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        const user=localStorage.getItem('user')
        const token=localStorage.getItem('token')

        if(user){
            setUser(JSON.parse(user))
            api.defaults.headers.Authorization=`Bearer ${token}`
        }
        setLoading(false)

    },[])

    async function ModifyAccount(email,userName){

            const response=await editUser(user?.id,email,userName)
            setUser(response.data)
            login(email,user.password)   
             
    }
    
    async function login(email,password){

        try {

            const response=await createSession(email,password)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('token',response.data.token)
    
            api.defaults.headers.Authorization=`Bearer ${response.data.token}`
    
            setUser(response.data.user)
            setErrorLogin('')
            navigate('/MyPage')
            
        } catch (error) {
            if(error.response.data.authenticationError){
                setErrorLogin('Usuário ou senha incorreto')
            }
        }
  
    }

    async function logout(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization=null
        setUser(null)
    }

    return(
        <AuthContext.Provider
        value={{
                authenticated:!!user,
                user,
                loading,
                errorLogin,
                ModifyAccount,
                login,
                logout
            }}
        >
        {children}
        </AuthContext.Provider>
    )
}
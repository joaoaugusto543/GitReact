import { useContext } from 'react'
import { useState } from 'react'
import {  createUser } from '../../../api/api'
import { AuthContext } from '../../contexts/auth'
import Loader from '../../layout/Loader/Loader'
import LoaderError from '../../layout/LoaderError/LoaderError'
import './styles.css'

function Registration(){

    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login} = useContext(AuthContext)
    const [loader,Setloader]=useState(false)
    const [loaderError,setLoaderError]=useState(false)
    const [errorEmail,setErrorEmail]=useState('')
    const [errorUserName,setErrorUserName]=useState('')
    const [errorPassword,setErrorPassword]=useState('')
    const [errorUserNameAlreadyExists,setErrorUserNameAlreadyExists]=useState('')
    const [emailAlreadyExists,setEmailAlreadyExists]=useState('')
    
    if(loaderError){
        return <LoaderError/>
    }

    async function register(){
        try {
            Setloader(true)
            await createUser(email,password,userName)
            setErrorEmail('')
            setErrorUserName('')
            setErrorPassword('')
            setErrorUserNameAlreadyExists('')
            await login(email,password)
            Setloader(false)

        } catch (error) {
            Setloader(false)
            
            if(error.response.data.error){
                setLoaderError(true)
            }

            if(error.response.data.errorEmail){
                setErrorEmail('Email inválido')
            }

            if(error.response.data.errorUserName){
                setErrorUserName('UserName inválido')
            }

            if(error.response.data.errorPassword){
                setErrorPassword('Ter no mínimo 8 dígitos')
            }

            if(error.response.data.errorUserNameAlreadyExists){
                setErrorUserNameAlreadyExists('UserName já está sendo utilizado')
            }

            if(error.response.data.emailAlreadyExists){
                setEmailAlreadyExists('Email já está sendo utilizado')
            }

        }
    }

    return(
        <div className='background'>
            {loader && <Loader/>}
            <div className='Registration'>
                <div className="forms">
                    <label htmlFor="UserName">UserName</label>
                    <input autoComplete="off" type="UserName" name="UserName" id="UserName" placeholder='ex:Lucas123' onChange={(e)=>setUserName(e.target.value)} />
                    <p>{errorUserName}</p>
                    {errorUserNameAlreadyExists && <p>{errorUserNameAlreadyExists}</p>}
                    <label htmlFor="email">Email</label>
                    <input autoComplete="off" type="email" name="email" id="email" placeholder="fulano@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
                    <p>{errorEmail}</p>
                    {emailAlreadyExists && <p>{emailAlreadyExists}</p>}
                    <label htmlFor="password">Senha</label>
                    <input autoComplete="off" type="text" name="password" id="password" placeholder="senha" onChange={(e)=>setPassword(e.target.value)} />
                    <p>{errorPassword}</p>
                    <div className='button'>
                        <button onClick={register}>Cadastrar-se</button>
                    </div>   
                </div> 
            </div>
        </div>
    )
}

export default Registration
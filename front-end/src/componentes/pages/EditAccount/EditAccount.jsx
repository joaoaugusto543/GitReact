import './styles.css'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import Loader from '../../layout/Loader/Loader'
import { editRepository, getRepositorios } from '../../../api/api'
import LoaderError from '../../layout/LoaderError/LoaderError'
import { Link } from 'react-router-dom'


function EditAccount(){

    const {user,loading,ModifyAccount}=useContext(AuthContext)
    const [userName,setUserName]=useState(user?.userName)
    const [email,setEmail]=useState(user?.email)
    const [loaderError,setLoaderError]=useState(false)
    const [errorEmail,setErrorEmail]=useState('')
    const [errorUserName,setErrorUserName]=useState('')
    const [errorUserNameAlreadyExists,setErrorUserNameAlreadyExists]=useState('')
    const [emailAlreadyExists,setEmailAlreadyExists]=useState('')
    
    if(loading){
        return <Loader/>
    }

    if(loaderError){
        return <LoaderError/>
    }

    async function updateUser(){
        try {
            setErrorEmail('')
            setErrorUserName('')
            setEmailAlreadyExists('')
            setErrorUserNameAlreadyExists('')
            const response=await getRepositorios(user.id,'')
            const repositorys=await response.data
            repositorys.map(async (repository)=>{
                await editRepository(user.id,repository._id,userName,repository.name,user.password)
            })
            await ModifyAccount(email,userName)
                 
        } catch (error) {
            
            if(error.response.data.error){
                setLoaderError(true)
            }

            if(error.response.data.errorEmail){
                setErrorEmail('Email inválido')
            }

            if(error.response.data.errorUserName){
                setErrorUserName('UserName inválido')
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
            <div className='editUser'>
                <h1>Editar Conta</h1>
                <div className="forms">
                    <label htmlFor="UserName">UserName</label>
                    <input autoComplete="off" type="text" name="UserName" id="UserName" placeholder='ex:Lucas123' onChange={(e)=>setUserName(e.target.value)} value={userName} />
                    <p>{errorUserName}</p>
                    {errorUserNameAlreadyExists && <p>{errorUserNameAlreadyExists}</p>}
                    <label htmlFor="email">Email</label>
                    <input autoComplete="off" type="email" name="email" id="email" placeholder="fulano@gmail.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <p>{errorEmail}</p>
                    {emailAlreadyExists && <p>{emailAlreadyExists}</p>}
                    <Link to='/EditPassword'>Modificar senha</Link>
                    <div className='buttonEditar'>
                        <button onClick={updateUser}>Editar conta</button>
                    </div>   
                </div> 
            </div>
        </div>
    )
}

export default EditAccount
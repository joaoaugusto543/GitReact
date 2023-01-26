import './styles.css'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import Loader from '../../layout/Loader/Loader'
import { editPassword } from '../../../api/api'
import LoaderError from '../../layout/LoaderError/LoaderError'


function EditPassword(){

    const {user,loading,logout}=useContext(AuthContext)
    const [loaderError,setLoaderError]=useState(false)
    const [password,setpassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [errorPassword,setErrorPassword]=useState('')

    
    if(loading){
        return <Loader/>
    }

    if(loaderError){
        return <LoaderError/>
    }

    async function updateUser(){
        try {
            await editPassword(user.id,password,newPassword)
            setErrorPassword('')
            await logout()

        } catch (error) {

            console.log(error)
            
            if(error.response.data.error){
                setLoaderError(true)
            }

            if(error.response.data.errorPassword){
                setErrorPassword('Senha incorreta ou nova senha com menos de 8 dígitos')
            }

        }
    }
    
   
    return(
        <div className='background'>
            <div className='editPassword'>
                <h1>Editar Senha</h1>
                <p>{errorPassword}</p>
                <div className="forms">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder='Senha' onChange={(e)=>setpassword(e.target.value)} value={password} />
                    <label htmlFor="newPassword">Nova Senha</label>
                    <input autoComplete="off" type="text" name="newPassword" id="newPassword" placeholder="Nova senha" onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
                    <div className='button'>
                        <button onClick={updateUser}>Editar Senha</button>
                    </div>   
                </div> 
            </div>
        </div>
    )
}

export default EditPassword
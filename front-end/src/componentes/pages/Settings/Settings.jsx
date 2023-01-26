import './styles.css'
import { Link} from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import { deleteRepository, deleteUser, getRepositorios } from '../../../api/api'
import Loader from '../../layout/Loader/Loader'
import WarningDelete from '../../layout/navBar/componentes/WarningDelete/warningDelete'
import { AuthContext } from '../../contexts/auth'
import LoaderError from '../../layout/LoaderError/LoaderError'
import {AiFillSetting,AiOutlineClose} from 'react-icons/ai'


function Settings(){

    const {logout,user}=useContext(AuthContext)
    const [showDeletionNotice,setShowDeletionNotice]=useState(false)
    const [loader,setLoader]=useState(false)
    const [loaderError,setLoaderError]=useState(false)
    
    if(loader){
        return <Loader/>
    }
    
    if(loaderError){
        return <LoaderError/>
    }
    
    if(showDeletionNotice){
        return <WarningDelete OnCloseWarning={CloseWarning} OnDeleteAccount={DeleteAccount}/>
    }

    function CloseSettings(){
        const settings=document.querySelector('.settings')
        settings.style='transform: translateX(100%);'
        document.body.style="overflow-y:;"
    }
    
    async function DeleteAccount(){
        try {
            setLoader(true)
            await deleteRepositorys()
            await deleteUser(user.id)    
            await logout()
            setShowDeletionNotice(false)
            setLoader(false)
    
        } catch (error) {
            setShowDeletionNotice(false)
            setLoader(false)
    
            if(error.response.data.error){
                setLoaderError(true)
            }
        }
    }
    
    async function deleteRepositorys(){
    
        const response=await getRepositorios(user.id,'')
        const repositorys=await response.data
    
        repositorys.map(async repository=>{
            await deleteRepository(user.id,repository._id)
        })
    }
    
    function CloseWarning(){
        setShowDeletionNotice(false)
    }
    
    function OpenWarning(){
        setShowDeletionNotice(true)
    }

    return(
        <div className="settings">
            <h1>Configurações<AiFillSetting/></h1>
            <Link to='/EditUser'><button  className='buttonSettings'>Editar Conta</button></Link>
            <button className='buttonSettings' onClick={OpenWarning} >Excluir Conta</button>
            <button onClick={logout} className='buttonSettings'>Sair<RiLogoutBoxRLine/></button>
            <button onClick={CloseSettings} className='closeSettings'><AiOutlineClose/></button>
        </div>
    )
}

export default Settings
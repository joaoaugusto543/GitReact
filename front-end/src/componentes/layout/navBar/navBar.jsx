import Logo from '../../../img/logo.jpeg'
import Conteiner from '../conteiner/container'
import './styles.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import Loader from '../Loader/Loader'
import UserMenu from './componentes/UserMenu/UserMenu'
import {AiOutlineMenu} from 'react-icons/ai'
import { useState } from 'react'
import SideNavBar from './componentes/SideMenu/SideMenu'
import Settings from '../../pages/Settings/Settings'
import WarningDelete from './componentes/WarningDelete/warningDelete'
import LoaderError from '../LoaderError/LoaderError'
import { deleteRepository, deleteUser, getRepositorios } from '../../../api/api'

function NavBar(){
    const {authenticated,loading,user,logout}=useContext(AuthContext)
    const [sideMenuIsOpen,setSideMenuIsOpen]=useState(false)
    const [showDeletionNotice,setShowDeletionNotice]=useState(false)
    const [loader,setLoader]=useState(false)
    const [loaderError,setLoaderError]=useState(false)
   
    if(loaderError){
        return <LoaderError/>
    }

    if(loader){
        return <Loader/>
    }

    if(showDeletionNotice){
        return <WarningDelete OnCloseWarning={CloseWarning} OnDeleteAccount={DeleteAccount}/>
    }

    function connected(){
        if(loading){
            return <Loader/>
        }

        if(!authenticated){
            return (
                <li>
                    <Link to='/Login'>Fazer Login</Link>
                    <div className="line"></div> 
                </li>
            )
        }else{
            return (<UserMenu setShowDeletionNotice={setShowDeletionNotice}/>)
        }

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


    function openSideMenu(){
        const sideMenu=document.querySelector('.sideMenu')
        sideMenu.style='transform:translateX(0);'
        document.body.style="overflow-y: hidden;"
    }

    function closeSideMenu(){
        const sideMenu=document.querySelector('.sideMenu')
        sideMenu.style='transform:translateX(100%);'
        document.body.style="overflow-y:;"
    }

    function SideMenu(){

        if(!sideMenuIsOpen){
            openSideMenu()
            setSideMenuIsOpen(true)
        }else{

            closeSideMenu()
            setSideMenuIsOpen(false)
        }
    }

    function openSettings(){
        const settings=document.querySelector('.settings')
        settings.style='transform: translateX(0);'
        document.body.style="overflow-y: hidden;"
    }

    return(
        <header className="navBar">
            <Settings/>
            <Conteiner type={'NavBar'}>
                <div className='navMenu'>
                    <img src={Logo} alt="logo" />
                    <button onClick={SideMenu} className='buttonSideMenu'><AiOutlineMenu/></button>

                    <ul className='menu'>
                        <li>
                            <Link to='/'>Home</Link>
                            <div className="line"></div>
                        </li>
                        <li>
                            <Link to='/'>Contato</Link>
                            <div className="line"></div>
                        </li>
                        <li>
                            <Link to='/'>Empresa</Link>
                            <div className="line"></div>
                        </li>
                        {connected()}
                        
                    </ul>

                </div>

                <SideNavBar onOpensSettings={openSettings}/>

            </Conteiner>
        </header>
    )
}

export default NavBar
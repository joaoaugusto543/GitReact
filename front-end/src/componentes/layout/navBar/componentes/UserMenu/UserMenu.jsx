import './styles.css'
import { Link} from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import { AuthContext } from '../../../../contexts/auth'


function UserMenu({setShowDeletionNotice}){

    const {authenticated,logout,user}=useContext(AuthContext)
    const [logoutFechado,setLogoutFechado]=useState(true)
    
    
    useEffect(()=>{
        if(authenticated){
            CloseUserMenu()
        }
    },[authenticated])

    function userMenu(){

        if(!logoutFechado){
            CloseUserMenu()
        }else{
            OpenUserMenu()
        }
    }

    function OpenUserMenu(){

        const logout=document.querySelector('.yourAccount')
        const button=document.querySelectorAll('.buttonHeader')

        logout.style.height='180px'
            setTimeout(()=>{
                button[0].style.display='flex'
                button[1].style.display='flex'
                button[2].style.display='flex'
                button[3].style.display='flex'
            },100)
            setLogoutFechado(false)
    }

    function CloseUserMenu(){

        const logout=document.querySelector('.yourAccount')
        const button=document.querySelectorAll('.buttonHeader')
        button[0].style.display='none'
        button[1].style.display='none'
        button[2].style.display='none'
        button[3].style.display='none'
        logout.style.height='0px'
        setLogoutFechado(true)

    }
    
    function OpenWarning(){
        setShowDeletionNotice(true)
    }

    return (
        <li className='userMenu'>
            <button onClick={userMenu} className='navBarButton sideMenuButton'>Sua Conta</button>
            <div className="line"></div> 
            <div className="yourAccount">
                <Link to='/MyPage'><button className='buttonHeader'>Conta</button></Link>
                <Link to='/EditUser'><button  className='buttonHeader'>Editar</button></Link>
                <button className='buttonHeader' onClick={OpenWarning} >Excluir</button>
                <button onClick={logout} className='buttonHeader lastButton'>Sair<RiLogoutBoxRLine/></button>
            </div>
         
        </li>
      
    )
}

export default UserMenu
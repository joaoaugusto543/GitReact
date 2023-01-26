import './styles.css'
import {BsFillTrashFill,BsPencil} from 'react-icons/bs'
import { useState } from 'react'
import Loader from '../../../../layout/Loader/Loader'
import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/auth'
import WarningDeleteRepositorys from './componentes/WarningDeleteRepositorys/WarningDeleteRepositorys'
import EditRepository from './componentes/EditRepository/EditRepository/EditRepository'
import WarningDeleteMobile from './componentes/WarningDeleteMobile/WarningDeleteMobile'

function CardRepositorys({index,repository,setLoaderError,setErrorName,setExistingRepository,quantityRepositories}){

    const {user,loading} = useContext(AuthContext)
    const [loader,setLoader]=useState(false)
  
    if(loader || loading){
        return <Loader/>
    }

    function ShowDeletionNoticeMobile(){

        const warning=document.querySelector(`.warningDeleteMobile${index}`)
        const p=document.querySelector(`.warningDeleteMobile${index} > p`)
        const div=document.querySelector(`.warningDeleteMobile${index} > div`)
        const button=document.querySelectorAll(`.warningDeleteMobile${index} > div > button`)
    
        if(index===quantityRepositories-1){
            warning.style='height:125px;border-bottom: 2px solid #d3ae4a;border-top: 2px solid #d3ae4a;'
        }else{
            warning.style='height:125px;border-bottom: 2px solid #d3ae4a;'
        }   

        setTimeout(()=>{
            p.style.display='block'
            div.style.display='flex'
            button[0].style.display='block'
            button[1].style.display='block'
        },260)
    }

    function ShowDeletionNotice(){
        const warning=document.querySelector(`.warningDelete${index}`)
        const p=document.querySelector(`.warningDelete${index} > p`)
        const div=document.querySelector(`.warningDelete${index} > div`)
        const button=document.querySelectorAll(`.warningDelete${index} > div > button`)

        if(index===quantityRepositories-1){
            warning.style='height:125px;width:20%;border-left:2px solid #d3ae4a;'
        }else{
            warning.style='height:125px;width:20%;border-left:2px solid #d3ae4a;border-bottom:2px solid #d3ae4a ;'
        }

            setTimeout(()=>{
                p.style.display='block'
                div.style.display='flex'
                button[0].style.display='block'
                button[1].style.display='block'
            },260)
    }

    function ShowEditForm(){

        const editForm=document.querySelector(`.editRepository${index}`)
        const label=document.querySelector(`.editRepository${index} > label`)
        const input=document.querySelector(`.editRepository${index} > input`)
        const buttons=document.querySelectorAll(`.editRepository${index} > div > button`)

        if(index===quantityRepositories-1){
            editForm.style='height:100px;border-bottom: 2px solid #d3ae4a;padding:1em 0;border-top: 2px solid #d3ae4a;'
        }else{
            editForm.style='height:100px;border-bottom: 2px solid #d3ae4a;padding:1em 0;'
        }

        setTimeout(()=>{
            label.style.display='block'
            input.style.display='block'
            buttons[0].style.display='block'
            buttons[1].style.display='block'
        },100)
   
    }

    return(
        <li className='list'>
            <div className='repository'>
                <div className='information'>
                    <div>
                        <p>{user.userName}</p>
                        <p>{repository.name}</p>
                    </div>
                    <div>
                        <button id='openDeletionNotice' onClick={ShowDeletionNotice}><BsFillTrashFill/></button>
                        <button id='openDeletionNoticeMobile' onClick={ShowDeletionNoticeMobile}><BsFillTrashFill/></button>
                        <button onClick={ShowEditForm}><BsPencil/></button>
                    </div>
                </div>

                <EditRepository index={index} setLoader={setLoader} setLoaderError={setLoaderError} setErrorName={setErrorName} setExistingRepository={setExistingRepository} repository={repository}/>
                <WarningDeleteMobile index={index} setLoader={setLoader} setLoaderError={setLoaderError} repository={repository}/>
            </div>

            <WarningDeleteRepositorys index={index} setLoader={setLoader} setLoaderError={setLoaderError} repository={repository}/>

        </li>               
    )

}

export default CardRepositorys
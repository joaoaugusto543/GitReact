import { useContext } from 'react'
import { useState } from 'react'
import { editRepository } from '../../../../../../../../api/api'
import { AuthContext } from '../../../../../../../contexts/auth'
import './styles.css'

function EditRepository({index,setLoader,setLoaderError,setErrorName,setExistingRepository,repository}){

    const [newName,setNewName]=useState(repository.name)
    const {user}=useContext(AuthContext)

    async function ModifyRepository(){

        try {

            setLoader(true)
            await editRepository(user.id,repository._id,user.userName,newName)
            window.location.reload(true)
            setTimeout(()=>{
                setLoader(false)
            },500)

        } catch (error) { 
 
            setLoader(false)

            if(error.response.data.messageinvalidNameMessage){
                setErrorName('Nome inválido')
                setTimeout(()=>{
                    setErrorName('')
                },500)
            }

            if(error.response.data.ExistingRepository){
                setExistingRepository('Esse repositório já existe')
                setTimeout(()=>{
                    setExistingRepository('')
                },800)
            }

            if(error.response.data.error){
                setLoaderError(true)
            }
            
        }
    
    }

    function RemoveEditForm(){
        const editForm=document.querySelector(`.editRepository${index}`)
        const label=document.querySelector(`.editRepository${index} > label`)
        const input=document.querySelector(`.editRepository${index} > input`)
        const buttons=document.querySelectorAll(`.editRepository${index} > div > button`)

        label.style.display='none'
        input.style.display='none'
        buttons[0].style.display='none'
        buttons[1].style.display='none'
        editForm.style='height:0px;border: none'
    }

        return (      
            <div className={`editRepository editRepository${index}`} >
                <label htmlFor="newName">Novo Nome:</label>
                <input type="text" name="newName" id="newName" placeholder='ex:React' onChange={(e)=>setNewName(e.target.value)} value={newName}/>
                <div>
                    <button onClick={ModifyRepository}>Editar</button>
                    <button onClick={RemoveEditForm}>Fechar</button>
                </div>
            </div>     
        )
}

export default EditRepository
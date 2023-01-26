import { useState } from "react"
import { createRepositorys } from "../../../../../api/api"
import Loader from "../../../../layout/Loader/Loader"
import LoaderError from "../../../../layout/LoaderError/LoaderError"
import './styles.css'

function NewRepo({idUser,userName,loaderError,setLoaderError}){

    const [newRepository,setNewRepository]=useState('')
    const [loader,setLoader]=useState(false)
    const [errorName,setErrorName]=useState('')
    const [existingRepository,setExistingRepository]=useState('')

    if(loader ){
        document.body.style="overflow: hidden;"
    }else{
        document.body.style="overflow: ;"
    }

    if(loader){
        return <Loader/>
    }

    async function CreateRepository(){
        try {

            setLoader(true)
            setErrorName('')
            setExistingRepository('')
            await createRepositorys(idUser,newRepository,userName)
            window.location.reload(true)
            setLoader(false)

        } catch (error) {
            setLoader(false)

            if(error.response.data.messageinvalidNameMessage){
                setErrorName('Nome inválido')
            }

            if(error.response.data.ExistingRepository){
                setExistingRepository('Esse repositório já existe')
            }

            if(error.response.data.error){
                setLoaderError(true)
            }
        }
    }

    return(
        <div className="newRepo">
           <div className="form">
                <label htmlFor="newRepo">New Repo:</label>
                <input autoComplete="off" type="text" id="newRepo" name="newRepo" placeholder="Ex:React" onChange={(e)=>setNewRepository(e.target.value)} />
                <button onClick={CreateRepository}>Criar</button>
           </div>
                <p>{errorName}</p>
                <p>{existingRepository}</p>
        </div>
    )
}

export default NewRepo
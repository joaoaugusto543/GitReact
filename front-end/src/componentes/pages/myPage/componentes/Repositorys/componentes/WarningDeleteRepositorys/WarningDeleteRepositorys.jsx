import { useContext } from 'react'
import { deleteRepository } from '../../../../../../../api/api'
import { AuthContext } from '../../../../../../contexts/auth'
import './styles.css'

function WarningDeleteRepositorys({index,setLoader,setLoaderError,repository}){

    const {user}=useContext(AuthContext)

    async function DeleteRepository(){
        try {
            
            setLoader(true)
            window.location.reload(true)
            await deleteRepository(user.id,repository._id)
            setLoader(false)

        } catch (error) {
           setLoader(false)
            console.log('syvbdv')
           if(error.response.data.error){
             setLoaderError(true)
           }
        }
    }

    function RemoveDeletionNotice(){

        const warning=document.querySelector(`.warningDelete${index}`)
        const p=document.querySelector(`.warningDelete${index} > p`)
        const div=document.querySelector(`.warningDelete${index} > div`)
        const button=document.querySelectorAll(`.warningDelete${index} > div > button`)

        warning.style='height:0;width:0;padding:0,border:none'
        p.style.display='none'
        div.style.display='none'
        button[0].style.display='none'
        button[1].style.display='none'

    }

        return (      
                <div className={`warningDelete warningDelete${index}`}>
                    <p>Deseja mesmo deletar esse repositório?</p>
                    <div>
                        <button onClick={DeleteRepository}>Sim</button>
                        <button onClick={RemoveDeletionNotice}>Não</button>
                    </div>
                </div>      
        )
}

export default WarningDeleteRepositorys
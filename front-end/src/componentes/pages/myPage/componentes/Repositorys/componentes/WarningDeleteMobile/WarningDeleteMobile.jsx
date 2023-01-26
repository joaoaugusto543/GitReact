import { useContext } from 'react'
import { deleteRepository } from '../../../../../../../api/api'
import { AuthContext } from '../../../../../../contexts/auth'
import './styles.css'

function WarningDeleteMobile({index,setLoader,setLoaderError,repository}){

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

    function RemoveDeletionNoticeMobile(){

        const warning=document.querySelector(`.warningDeleteMobile${index}`)
        const p=document.querySelector(`.warningDeleteMobile${index} > p`)
        const div=document.querySelector(`.warningDeleteMobile${index} > div`)
        const button=document.querySelectorAll(`.warningDeleteMobile${index} > div > button`)

        warning.style='height:opx;border-bottom: none;'
        p.style.display='none'
        div.style.display='none'
        button[0].style.display='none'
        button[1].style.display='none'

    }

    return(
        <div className={`warningDeleteMobile warningDeleteMobile${index}`}>
            <p>Deseja mesmo deletar esse repositório?</p>
            <div>
                <button onClick={DeleteRepository}>Sim</button>
                <button onClick={RemoveDeletionNoticeMobile}>Não</button>
            </div>
        </div>
    )
}

export default WarningDeleteMobile
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../../contexts/auth"
import Loader from "../../../Loader/Loader"
import './styles.css'


function SideNavBar({onOpensSettings}){

    const {authenticated,loading}=useContext(AuthContext)

    function connected(){
        if(loading){
            return <Loader/>
        }

        if(!authenticated){
            return (
                <li className='listaSideMenu'>
                    <Link to='/Login'>Fazer Login</Link>
                </li>
            )
        }else{
            return (
                <li className='listaSideMenu'>
                    <Link to='myPage'>Sua Conta</Link>
                </li>
            )
        }

    }
    
    function appearConfiguration(){
        if(loading){
            return <Loader/>
        }
    
        if(authenticated){
            return (
                <li className='listaSideMenu'>
                    <button onClick={onOpensSettings}>Configurações</button>
                </li>
            )
        }
    
    }

    return(
        <ul className='sideMenu'>
            <li className='listaSideMenu'>
                <Link to='/'>Home</Link>
            </li>
            <li className='listaSideMenu'>
                <Link to='/'>Contato</Link>
            </li>
            <li className='listaSideMenu'>
                <Link to='/'>Empresa</Link>
            </li>
            {connected()}
            {appearConfiguration()}
                    
        </ul>
    )
}
export default SideNavBar


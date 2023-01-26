import { Link } from "react-router-dom"
import './styles.css'

function LoaderError(){
    return(
        <div className="error">
            <p>Ocorreu um erro interno, <Link to='/'>Voltar</Link></p>
        </div>
    )
}

export default LoaderError
import {FaFacebook,FaGithub,FaInstagram} from 'react-icons/fa'
import Conteiner from '../conteiner/container'

import './styles.css'


function Footer({page}){
    return(
        <footer className={`footer ${page}`}>
                <Conteiner type={'footer'}>
                    <div className='socialNetworks' >         
                        <a href='/'><FaFacebook/> <p>João Correia Lopes</p> </a>
                        <a href='/'><FaInstagram/> <p>@joao_correia_lopes</p></a>
                        <a href='https://github.com/joaoaugusto543'><FaGithub/> <p>joaoaugusto543</p></a>
                    </div>

                    <div className='copyright'>
                        <p>copyright&copy;<span>Todos os direitos reservados à </span>GitReact.</p>
                    </div>
                </Conteiner>
        </footer>
      
    )
}

export default Footer
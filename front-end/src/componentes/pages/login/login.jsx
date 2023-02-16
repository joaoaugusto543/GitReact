import { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import './styles.css'

function Login(){

    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const {login,errorLogin} = useContext(AuthContext)
    
    
    async function LoginPage(){
         login(email,password) 
    }

    return (
        <div className="background">
            <div className="login">
                <h1>Login</h1>
                <p>{errorLogin}</p>
                <div className='loginInformation'>
                    <div className="forms">
                        <label htmlFor="email">E-mail</label>
                        <input autoComplete="off" type="email" name="email" id="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                        <label htmlFor="password">Senha</label>
                        <input autoComplete="off" type="password" name='password' id='password' placeholder='Senha' onChange={(e)=>setPassword(e.target.value)}/>
                        <Link to='/Registration'>Não possui conta?</Link>
                        <div className='buttonLogin'>
                            <button onClick={LoginPage}>Entrar</button>
                        </div>   
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Login

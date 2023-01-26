import NavBar from "../../layout/navBar/navBar"
import './styles.css'
import Logo from '../../../img/imgHome.png'
import Footer from "../../layout/footer/footer"
import Conteiner from "../../layout/conteiner/container"
import Instrucoes from "./Componentes/Instrucoes/Instrucoes"

function Home(){

    const comoFazerConta=['Primeiro clique em fazer login;','Em seguida clique no link abaixo do login;','Preencha as informções corretamente;','Parabéns!!! seja bem-vindo ao GitRect!']
    const comoFunciona=['Quando criar a conta você será direcionado para a sua conta','Quando estiver na sua conta poderá adicionar repositórios','Vai conseguir realizar pesquisas','Poderá excluir e editar repositórios']

    return (
        <>
            <NavBar/>
            <Conteiner>
                <div className="home">
                    <div>
                        <h1>Bem-vindo ao <span>GitReact</span></h1>
                        <h2>Organize seus Repositórios</h2>
                        <img src={Logo} alt="logo" />
                    </div>
                </div>
                <Instrucoes title='Criar conta' list={comoFazerConta}/>
                <Instrucoes title='Funcionamento' list={comoFunciona}/>
            </Conteiner>

            <Footer page='Home'/>
        </>
    )
}

export default Home
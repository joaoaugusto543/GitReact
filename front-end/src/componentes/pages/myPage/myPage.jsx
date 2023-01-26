import NavBar from "../../layout/navBar/navBar"
import Footer from '../../layout/footer/footer'
import Search from "./componentes/Search/Search"
import CardRepositorys from "./componentes/Repositorys/CardsRepositorys"
import { useState } from "react"
import { useEffect } from "react"
import { getRepositorios } from '../../../api/api'
import './styles.css'
import NewRepo from "./componentes/newRepo/newRepo"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import Loader from "../../layout/Loader/Loader"
import LoaderError from "../../layout/LoaderError/LoaderError"

function MyPage(){

    const [repositorys,setRepositorys]=useState([])
    const [loader,setLoader]=useState(true)
    const [loaderError,setLoaderError]=useState(false)
    const [query,setQuery]=useState('')
    const {user}=useContext(AuthContext)
    const [errorName,setErrorName]=useState('')
    const [existingRepository,setExistingRepository]=useState('')
   
    const userId=user?.id
    const userName=user?.userName

    useEffect(()=>{

        if(userId){
            loadData()
        }

    },[userId])

    if(loader || loaderError){
        document.body.style="overflow-y: hidden;"
    }else{
        document.body.style="overflow-y: ;"
    }

    if(loader){
        return <Loader/>
    }

    if(loaderError){
        return <LoaderError/>
    }

    async function loadData(query=''){
        try {
            let response= await getRepositorios(userId,query)
            setRepositorys(response.data)
            setLoader(false)
        } catch (err) {
            setLoaderError(true) 
            setLoader(false)
        }    
    }

    function addQuery(){
        loadData(query)
    }

    function clear(){
        loadData()
        setQuery('')
    }

    return (
        <div className="page">
            <NavBar/>
            <div className="myPage">
                <Search setQuery={setQuery} query={query} addQuery={addQuery} clear={clear}/>
                {existingRepository && <p className="errorName">{existingRepository}</p>}
                {errorName && <p className="errorName">{errorName}</p>}
                {!loader &&
                <ul className="repositorys">
                    {repositorys.map((repository,index)=>{
                        return(<CardRepositorys key={repository._id} repository={repository} index={index} setLoaderError={setLoaderError} errorName={errorName} setErrorName={setErrorName} setExistingRepository={setExistingRepository} existingRepository={existingRepository} quantityRepositories={repositorys.length}/>)      
                    }
                    )}
                </ul>
                
                }
                    
                <NewRepo idUser={userId} userName={userName} loaderError={loaderError} setLoaderError={setLoaderError} />
            </div>
            <Footer/>
        </div>
    )
}

export default MyPage
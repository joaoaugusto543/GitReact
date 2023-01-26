import { useContext } from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import { AuthContext, ContextProvider } from '../contexts/auth'
import Loader from '../layout/Loader/Loader'
import EditAccount from '../pages/EditAccount/EditAccount'
import EditPassword from '../pages/EditPasswor/EditPassword'
import Home from '../pages/homePage/homePage'
import Login from '../pages/login/login'
import MyPage from '../pages/myPage/myPage'
import Registration from '../pages/Registration/Registration'


function AppRoutes(){

    function Private({children}){

        const {authenticated}=useContext(AuthContext)
        const {loading}=useContext(AuthContext)
   
        if(loading){
            return <Loader/>
        }

        if(!authenticated){
            return <Navigate to='/'/>
        }

        return children
    }

    function PrivateToAuthorized({children}){

        const {authenticated}=useContext(AuthContext)
        const {loading}=useContext(AuthContext)
   
        if(loading){
            return <Loader/>
        }

        if(authenticated){
            return <Navigate to='/MyPage'/>
        }

        return children
    }

    return(
        <Router>
            <ContextProvider>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/MyPage' element={<Private><MyPage/></Private>}/>
                    <Route path='/Login' element={<PrivateToAuthorized><Login/></PrivateToAuthorized>}/>
                    <Route path='/Registration' element={<PrivateToAuthorized><Registration/></PrivateToAuthorized>}/>
                    <Route path='/EditUser' element={<Private><EditAccount/></Private>}/>
                    <Route path='/EditPassword' element={<Private><EditPassword/></Private>}/>
                </Routes>
            </ContextProvider>
        </Router>
    )
}

export default AppRoutes
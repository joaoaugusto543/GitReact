import './styles.css'
import {AiOutlineSearch} from 'react-icons/ai'

function Search({setQuery,addQuery,clear,query}){
    return(
        <div className='Search'>
            <label htmlFor="Search">Nome:</label>
            <input autoComplete="off" type="text" name="Search" id="Search" placeholder="ex:React" onChange={(e)=>setQuery(e.target.value)} value={query}/>
            <div>
                <button onClick={addQuery}><AiOutlineSearch/></button>
                <button onClick={clear}>Limpar</button>
            </div>
        </div>
    )
}

export default Search
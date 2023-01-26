import './styles.css'

function Instrucoes({list,title}){
    return(
        <div className="instrucoes">
            <h1>{title}</h1>
            <ul>
                {list.map((item,index)=>(<li key={index}>{item}</li>))}
            </ul>
        </div>
    )
}

export default Instrucoes
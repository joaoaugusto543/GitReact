import './styles.css'

function Conteiner(props){
    return <div className={`container ${props.type}`}>{props.children}</div>
    
}
export default Conteiner
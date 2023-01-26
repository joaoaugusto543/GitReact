import './styles.css'

function WarningDelete({OnDeleteAccount,OnCloseWarning}){
    return(
        <div className="background">
            <div className="warningDeleteUser">
                <h1>Tem certeza que deseja deletar essa conta?</h1>
                <div>
                    <button onClick={OnDeleteAccount}>Sim</button>
                    <button onClick={OnCloseWarning}>Não</button>
                </div>

            </div>
        </div>
    )
}

export default WarningDelete
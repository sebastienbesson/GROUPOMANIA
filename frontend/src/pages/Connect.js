import '../styles/Connect.css'

function Connect() {
    return  (
    <div className='gpm-connect'>
        <h1>Connexion</h1>
        <label>Nom</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>Mot de passe</label>
        <input type="text" />
        <button>Entrée</button>
    </div>
    )
}

export default Connect
import '../styles/Subscribe.css'

function Subscribe() {
    return  (
        <div className='gpm-subscribe'>
        <h1>Inscription</h1>
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

export default Subscribe
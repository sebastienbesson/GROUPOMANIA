import { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Account.css'

function Account() {
    const [username, setUsername] = useState('');
    let id = localStorage.getItem('userId');
    fetch(`http://localhost:3001/api/auth/user/${id}}`,{
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      })
      .then((result) => {
        result.json()
        .then((resp) => {
          setUsername(resp.userName)
        })
      })
      function deleteUser(id)
        { fetch(`http://localhost:3001/api/auth/user/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'Application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((result) => {
                result.json()
            .then((resp) => {
                localStorage.clear();
            })
            })
        }
    return  (
        <div className='account-wrapper'>
            <label>Nom:</label>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <label>Ma photo:</label>
            <div>
              <Link to={{pathname: `/ChangePassword/${id}`}}>Changer mon mot de passe</Link> 
            </div>
            <div className="account-delete-btn"><button onClick={()=>deleteUser(id)}>Supprimer mon compte</button></div>
            <div>
              <Link to="/Home">Retour Home</Link>
            </div>  
        </div>
    )
}

export default Account
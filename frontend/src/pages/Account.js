import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Account.css'

function Account() {
    const [username, setUsername] = useState('');
    const [contentUrl, setContentUrl] = useState('');
    const navigate = useNavigate();
    let id = localStorage.getItem('userId');
    fetch(`${process.env.REACT_APP_URL}/auth/user/${id}}`,{
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
      
        { fetch(`${process.env.REACT_APP_URL}/auth/user/${id}`,{
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
                navigate("../Connect");
            })
            })
        }
    return  (
        <div className='account-wrapper'>
            <label>Nom:</label>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <label>Ma photo:<img src={contentUrl}/></label>
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
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
          setContentUrl(resp.contentUrl)
        })
      })

      function deleteUser(id){
        fetch(`${process.env.REACT_APP_URL}/auth/user/${id}`,{
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
            <input className="account-wrapper-name" type="text" value={username}/>
            <label><img src={contentUrl}/></label>
            <div>
              <Link to={{pathname: `/ModifyUserAccount/${id}`}}>Changer le nom ou la photo</Link> 
            </div>
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
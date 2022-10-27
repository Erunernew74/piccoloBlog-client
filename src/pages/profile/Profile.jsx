import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './profile.css'

const Profile = () => {
    const [userData, setUserData] = useState({})

    //* Nel momento in cui si carica la pagina prendiamo i dati dai cookies
    //* per poi vederli laddove vogliamo che vengano visti    
    useEffect(() => {
        const setData = async() => {
            const cookie = Cookies.get("user");
            const user = JSON.parse(cookie);
            setUserData(user);
        }
        setData();
    }, [])

    const [disable, setDisable] = useState(true);

        const handleToggle = () => {
            setDisable(!disable)
        }


  return (
    <div className='containerProfileGenerale'>
        <h1>Profilo utente ({userData.isAdmin ? "Amministratore" : "Guest"})</h1>
        <button 
            className='buttonProfile' 
            onClick={(handleToggle)}
            style={disable ? {color:'white', background: 'teal'}
                 : {color:'teal', background: 'white'}}>
                {disable ? 'ABILITA' : 'DISABILITA'}
        </button>
        <div className='profileContainer'>
            <label htmlFor="">Nome utente</label>
            <input 
                type="text" 
                value={userData.nome}
                disabled
            />
            <label htmlFor="">Cognome utente</label>
            <input 
                type="text" 
                value={userData.cognome}
                disabled
            />
            <label htmlFor="">Username</label>
            <input 
                type="text" 
                value={userData.username}
                disabled={disable}
            />
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                value={userData.email}
                disabled
            />
        </div>
    </div>
  )
}

export default Profile

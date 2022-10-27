import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import FadeLoader from "react-spinners/ClipLoader";

const ConfirmAccount = () => {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

    const { token } = useParams();
    const [accountConfirmed, setAccountConfirmed] = useState();
    useEffect(() => {
        const checkToken = async () => {
            const res = await fetch(`http://localhost:5000/auth/confirm-account/${token}`);
            setAccountConfirmed(res.ok);
            setTimeout(() => {
                return <Navigate to='/login' />
            }, 1500)
        }
        checkToken()
    }, [])

    if(accountConfirmed == undefined) return null;
    if(!accountConfirmed) return <Navigate to='/login' />

  return (
    <div style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      {loader ? <FadeLoader color="#0b0b0b" size={100} /> : <h1>Il tuo account è stato confermato</h1>}
      
    </div>
  )
}

export default ConfirmAccount

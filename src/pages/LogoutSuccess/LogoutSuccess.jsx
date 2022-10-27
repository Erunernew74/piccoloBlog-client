import React, { useState, useEffect } from 'react'
import FadeLoader from "react-spinners/ClipLoader";

const LogoutSuccess = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setInterval(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh'
    }}>
      {
        loading ? <FadeLoader color="#0b0b0b" size={100}/> : <h1>Logout avvenuto con successo</h1>
      }
      
    </div>
  )
}

export default LogoutSuccess

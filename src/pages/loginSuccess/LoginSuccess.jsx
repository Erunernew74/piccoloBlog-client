import React, {useState, useEffect} from 'react'
import FadeLoader from "react-spinners/ClipLoader";

const LoginSuccess = () => {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])
  return (
    <div style={{
      width: '100%',
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }}>
    {loader ? <FadeLoader color="#0b0b0b" size={100}/> : <h1>login avvenuto con successo</h1> }
      
    </div>
  )
}

export default LoginSuccess

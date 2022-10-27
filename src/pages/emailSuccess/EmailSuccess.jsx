import React, {useState, useEffect} from 'react'
import FadeLoader from "react-spinners/ClipLoader";

const EmailSuccess = () => {
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
      {loader ? <FadeLoader color="#0b0b0b" size={100} /> : <h3>Controlla la tua email e clicca sul link per recuperare la tua password o resettarla</h3>}
      
    </div>
  )
}

export default EmailSuccess

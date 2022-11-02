import { useContext, createContext, useEffect, useState} from 'react'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

const AuthComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

 // AuthComponent é usato per wrappare tutta l'applicatione e isAuth e setIsAuth sono disponibily a tutti i componenti figli,
 // compresi barra di navigazione e componente di Login.
 // mi aspetto che quindi anche "navigando" il valore True impostato dopo il login venga mantenuto,
 // mi viene il sospetto che questa nuova richiesta invece ritorni False e di fatto rimuova l'autenticazione.
 // é facile da verificare 

    // cosa succede qui?
    // perché sta inviando una richiesta passando "credentials: "include"" ??
    // perché si aspetta che ritorni True ?
    // é possibile che questo codice stia in effetti setttando isAuth a False ??? 
    useEffect(() => {
        const verifyToken = async () => {
            const res = await fetch(`http://localhost:5000/auth/jwt-verify`, {
                credentials: "include"
            })   
            console.info("JWT verified (setIsAuth): ", res.ok ? "yes" : "no") 
            setIsAuth(res.ok)            
        }
        verifyToken()
    }, [])
    
    return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthComponent
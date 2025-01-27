import {useEffect, createContext, useState} from 'react'

export const UserContext= createContext()
const UserProvider=({children})=>{
    const [currentuser, setCurrentuser] = useState(JSON.parse(localStorage.getItem('user')))
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(currentuser))
    }, [currentuser])
    

    return <UserContext.Provider value={{currentuser, setCurrentuser}}>{children}</UserContext.Provider>
}

export default UserProvider
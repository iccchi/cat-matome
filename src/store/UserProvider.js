import React, { createContext, useState } from 'react'

export const userContext = createContext()
const initialState = {
  id: null
}

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(initialState)
  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider
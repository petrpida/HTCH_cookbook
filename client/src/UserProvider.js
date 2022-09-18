import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false)

    const changeAuthorization = () => {
        setIsAuthorized(!isAuthorized)
    }

    const value = {
        isAuthorized,
        changeAuthorization
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
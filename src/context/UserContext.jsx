import jwtDecode from "jwt-decode";
import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

export function useUser(){
    return useContext(UserContext);
}

export function UserProvider({ children }){
    const [ user, setUser ] = useState();

    const storeToken = (_utoken) => {
        localStorage.setItem('n_token', _utoken);
    }

    const getToken = () => {
        
        let _token = localStorage.getItem('n_token') || null;
        if(_token){
            const decoded = jwtDecode(_token);
            if(decoded.exp - decoded.iat >= 0) return JSON.parse(_token);
            else localStorage.setItem('n_token', ''); 
        }

    }

    const setCurrentUser = () => {
        fetch(import.meta.env.VITE_API_URL + 'users/')
        // decode token, get user details and fetch the user details to create the current user
    }
    
    const token = getToken();

    const contextValue = useMemo(() => ({
        user,
        token,
        storeToken

    }),[user])

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
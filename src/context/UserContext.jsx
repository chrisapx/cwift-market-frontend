import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('n_token');
        if (storedToken) {
            setToken(storedToken);
            const decoded = jwtDecode(storedToken);
            if (decoded.exp * 1000 > Date.now()) {
                fetchUserData(token, decoded.sub);
            } else {
                localStorage.removeItem('n_token');
            }
        }

    }, [token]);

    const storeToken = (_utoken) => {
        localStorage.setItem('n_token', _utoken);
        setToken(_utoken);
    }

    const fetchUserData = (token, username) => {
        fetch(`http://127.0.0.1:8080/users/user/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setUser(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
      };

    const contextValue = useMemo(() => ({
        user,
        token,
        storeToken,
    }), [user, token]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

import { createContext, useState, useContext, useEffect } from "react";

import { makeHttpRequest } from '../adapters/requests';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children } = props;
    const [ user, setUser ] = useState({
        loggedIn: false,
        username: "",
        email: ""
    })
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || "/";

    console.log( "from", from )

    useEffect(() => {
        const requestBody = {
            query: `
                query {
                    checkAuth {
                        username
                        email
                    }
                }
            `
          }

        makeHttpRequest(requestBody)
        .then(res => {
            if(!res.data) {
                return console.log(res.errors)
            }
            console.log(res)
            signIn(res.data.checkAuth, () => navigate(from, { replace: true }))
        })
        .catch(err => console.error(err))

    }, [])

    const signIn = (userData, callback) => {
        setUser({
            loggedIn: true,
            username: userData.username,
            email: userData.email
        });

        callback();
    }

    const signOut = (callback) =>{
        setUser({
            loggedIn: false,
            username: "",
            email: ""
        });
        callback()
    }

    const value = { user, signIn, signOut}

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
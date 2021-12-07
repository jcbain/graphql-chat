import { createContext, useState, useContext, useEffect } from "react";

import { makeHttpRequest } from '../adapters/requests';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children } = props;
    const [ user, setUser ] = useState({
        loggedIn: false,
        username: "",
        email: "",
        loading: true
    });

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
                if(res.errors) {
                    return console.log(res.errors)
                }

               signIn(res.data.checkAuth, () => console.log('signed in'));
            })
            .catch(err => {
               console.error(err)
               setUser(prev => ({
                  ...prev,
                  loading: false
               }))
            })

    }, [])

    const signIn = (userData, callback) => {
        setUser({
            loggedIn: true,
            username: userData.username,
            email: userData.email, 
            loading: false
        });

        callback();
    }

    const signOut = (callback) =>{
        setUser({
            loggedIn: false,
            username: "",
            email: "", 
            loading: false
        });
        callback()
    }

    const value = { user, signIn, signOut };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
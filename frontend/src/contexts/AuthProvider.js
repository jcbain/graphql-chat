import { createContext, useState, useContext, useEffect } from "react";
import {useQuery, gql, useSubscription} from '@apollo/client';

import { makeHttpRequest } from '../adapters/requests';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children, client } = props;
    const [ user, setUser ] = useState({
        loggedIn: false,
        username: "",
        email: "",
        loading: true
    });




    useEffect(() => {
        const requestBody = gql`
        query {
            checkAuth {
                username
                email
            }
        }
    `;

        client.query({query: requestBody})
            .then(res => {
                if(res.error){
                    setUser( prev => ({
                        ...prev,
                        loading: false
                    }))
                    return
                }
                signIn(res.data.checkAuth)

            })
            .catch(err => {
                setUser(prev => ({
                    ...prev,
                    loading: false
                }))
            })
    }, [client])

        const sub = gql`
            subscription OnMessageAdded($conversationId: ID!) {
                newMessage(conversationId: $conversationId) {
                    _id
                    body
                }
            }
        `

        const stuff = useSubscription(sub, { variables: { conversationId: "61aa52764dd2f2fa797d5f3b" } });
        console.log(stuff)


    // useEffect(() => {
    //      const requestBody = {
    //         query: `
    //             query {
    //                 checkAuth {
    //                     username
    //                     email
    //                 }
    //             }
    //         `
    //      }

    //     makeHttpRequest(requestBody)
    //         .then(res => {
    //             if(res.errors) {
    //                 return console.log(res.errors)
    //             }

    //            signIn(res.data.checkAuth, () => console.log('signed in'));
    //         })
    //         .catch(err => {
    //            console.error(err)
    //            setUser(prev => ({
    //               ...prev,
    //               loading: false
    //            }))
    //         })

    // }, [])

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

    const value = { user, signIn, signOut, client };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
import { createContext, useState, useContext, useEffect } from "react";
import {useQuery, gql, useSubscription} from '@apollo/client';

import { makeHttpRequest } from '../adapters/requests';


const GET_AUTH = gql`
    query Login($username: String, $password: String){
        login(username: $username, password: $password) {
            loggedIn
            username
            email
        }
    }
`;

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children } = props;
    const { loading, error, data, refetch, client } = useQuery(GET_AUTH, {variables: {username: "", password: ""}});

    console.log('stuff', loading)
    console.log('stuff', data)

    // console.log('client', client)
    
    // const [ user, setUser ] = useState({
    //     loggedIn: false,
    //     username: "",
    //     email: "",
    //     loading: true
    // });



    // useEffect(() => {
    //     const requestBody = gql`
    //     query {
    //         checkAuth {
    //             loggedIn
    //             username
    //             email
    //         }
    //     }
    // `;

    //     client.query({query: requestBody})
    //         .then(res => {
    //             if(res.error){
    //                 setUser( prev => ({
    //                     ...prev,
    //                     loading: false
    //                 }))
    //                 return
    //             }
    //             console.log(res)
    //             signIn(res.data.checkAuth)

    //         })
    //         .catch(err => {
    //             setUser(prev => ({
    //                 ...prev,
    //                 loading: false
    //             }))
    //         })
    // }, [client])

        // const sub = gql`
        //     subscription OnMessageAdded($conversationId: ID!) {
        //         newMessage(conversationId: $conversationId) {
        //             _id
        //             body
        //         }
        //     }
        // `

        // const stuff = useSubscription(sub, { variables: { conversationId: "61aa52764dd2f2fa797d5f3b" } });
        // console.log(stuff)


    const signIn = (username, password, callback) => {
        refetch({username: username, password: password})
        console.log("client", client)
        callback();
        // console.log('hellow')
        // console.log(username, password)
        // client.resetStore().then(() => {
        //     return client.query({ query: GET_AUTH, variables: {username, password}})
        // })
        // .then((res) => {
        //     console.log('res', res);
        //     callback();
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        
        // setUser({
        //     loggedIn: true,
        //     username: userData.username,
        //     email: userData.email, 
        //     loading: false
        // });

        
    }

    const signOut = (callback) =>{
        // setUser({
        //     loggedIn: false,
        //     username: "",
        //     email: "", 
        //     loading: false
        // });
        callback()
    }

    const value = { loggedIn: data?.login?.loggedIn, loading: loading, signIn, signOut };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
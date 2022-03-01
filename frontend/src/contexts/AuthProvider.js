import { createContext, useContext } from "react";
import {useQuery } from '@apollo/client';

import { GET_AUTH } from '../graphql/queries';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children } = props;
    const { loading, error, data, refetch } = useQuery(GET_AUTH, {variables: {username: "", password: ""}});
    const signIn = async (username, password, callback) => {
        try {

            await refetch({username: username, password: password})
            callback();        
        } catch(err) {
            console.log(err);
        }
    }


    const signOut = (callback) =>{
        callback()
    }

    const value = { loggedIn: data?.login?.loggedIn, username: data?.login?.username, loading, error, signIn, signOut };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
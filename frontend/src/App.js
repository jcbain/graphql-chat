import { useEffect, useState } from "react";
import {ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql, useQuery} from "@apollo/client"

import Login from "./components/Login";




function App() {

  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:8090/graphql',
      credentials: 'include'
    }),
    cache: new InMemoryCache()
  })
  const [ credentials, setCredentials ] = useState({
    isLoggedIn: false,
    bearer: ""
  });

  useEffect(() => {
    client.query({
      query: gql`
        query {
          login(username: "jbain", password: "123") {
            token
          }
        }
      `
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }, [client])


 

  const login = (data) => {
    localStorage.setItem("token", data.token)
    setCredentials({
      isLoggedIn: true,
      bearer: data.token
    })
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if(token){
      setCredentials({
        isLoggedIn: false,
        bearer: token
      })
    }
  
  }, [])
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Login login={login}/>

    </div>
    </ApolloProvider>
  );
}

export default App;

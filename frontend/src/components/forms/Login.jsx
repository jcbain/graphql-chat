import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { useAuth } from "../../contexts/AuthProvider";
import { Container, Form, Title, Input, Button } from './styles';
import gql from "graphql-tag";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !username) return;

    auth.signIn(username, password, () => navigate(from))

    // const requestBody = gql`
    //     query {
    //       login(username: "${username}", password: "${password}") {
    //         email
    //         username
    //         tokenExpiration
    //       }
    //     }
    //   `

    // auth.client.query({query: requestBody})
    // .then(res => {
    //   if(res.error){
    //     auth.signOut(() => console.log('logged out'))
    //     return console.log(res.error)
  
    //   }
    //   setPassword("")
    //   setUsername("")
    //   auth.signIn(res.data.login, () => navigate(from))

    // })
    // .catch(err => {
    //   console.error(err)
    // })

  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input value={username}
          placeholder="username"
          onChange={event => setUsername(event.target.value)}
        />
        <br/>
        <Input value={password} 
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  )
}

export default Login;
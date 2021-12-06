import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { keyframes } from "styled-components";

import { useAuth } from "../../contexts/AuthProvider";
import { makeHttpRequest } from "../../adapters/requests"
import { Container, Form, Title, Input, Button } from './styles';

const Login = (props) => {
  // const { login } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !username) return;

    const requestBody = {
      query: `
        query {
          login(username: "${username}", password: "${password}") {
            email
            username
            tokenExpiration
          }
        }
      `
    }
    makeHttpRequest(requestBody)
    .then(res => {
      if(!res.data) {
        auth.signOut(() => console.log('logged out'))
        return console.log(res.errors)
      }
      console.log(res)
      setPassword("")
      setUsername("")
      auth.signIn(res.data.login, () => navigate(from, { replace: true }))
    })
    .catch(err => console.error(err))

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
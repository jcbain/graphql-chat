import { useState } from "react";
import { Container, Form, Title, Input, Button } from './styles';

const Login = (props) => {
  const {login} = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
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

    fetch('http://localhost:8090/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })
    .then(res => {
      console.log(res)
      if(res.status !== 200) {
        console.log(res)
        return;
      }
      return res.json()
    })
    .then(res => {
      console.log(res)
      setPassword("")
      setUsername("")
      login(res.data.login)
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
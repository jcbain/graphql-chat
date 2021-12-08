import { useState } from "react";
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../../graphql/mutations';
import { Container, Form, Title, Input, Button } from './styles';



const Register = (props) => {
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("");
  const [ passwordCheck, setPasswordCheck ] = useState("")

  const [createUser, {error, loading}] = useMutation(CREATE_USER);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !username || !username || !passwordCheck ) return;

    if (password !== passwordCheck) return;

    createUser({variables: {username, email, password}})
    setPassword("")
    setUsername("")
    setPasswordCheck("")
    setEmail("")
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input value={username}
          placeholder="username"
          onChange={event => setUsername(event.target.value)}
        />
        <Input value={email} 
          placeholder="email"
          onChange={event => setEmail(event.target.value)}
        />
        <Input value={password} 
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        />
        <Input value={passwordCheck} 
          placeholder="verify password"
          onChange={event => setPasswordCheck(event.target.value)}
        />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  )
}

export default Register;
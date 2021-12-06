import { useState } from "react";
import { Container, Form, Title, Input, Button } from './styles';

const Register = (props) => {
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("");
  const [ passwordCheck, setPasswordCheck ] = useState("")

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !username || !username || !passwordCheck ) return;

    if (password !== passwordCheck) return;


    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {username: "${username}", email: "${email}", password: "${password}"}) {
            email
            username
          }
        }
      `
    };

    fetch('/graphql', {
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
      setPasswordCheck("")
      setEmail("")
    })
    .catch(err => console.error(err))

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
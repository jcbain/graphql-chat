import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { useAuth } from "../../contexts/AuthProvider";
import { Container, Form, Title, Input, Button } from './styles';


// try turning this into a higher order component to avoid rerender issue?
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
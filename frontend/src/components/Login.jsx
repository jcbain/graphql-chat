const { useState } = require("react")

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      query: `
        query {
          login(username: "${username}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    fetch('http://localhost:8090/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.status !== 200) {
        console.log(res)
        return;
      }
      return res.json()
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input value={username} 
          onChange={event => setUsername(event.target.value)}
        />
        <br/>
        <label>password</label>
        <input value={password} 
          onChange={event => setPassword(event.target.value)}
        />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
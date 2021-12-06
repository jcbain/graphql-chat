import { useEffect, useState } from "react";

import GlobalStyle from "./styles/GlobalStyles";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
function App() {

  const [ credentials, setCredentials ] = useState({
    isLoggedIn: false,
    username: "",
    email: ""
  });


  const login = (data) => {
    console.log(data)
    setCredentials({
      isLoggedIn: true,
      username: data.username,
      email: data.email
    })
  }

  return (
    <div className="App">
      <GlobalStyle />
      {/* <Login login={login}/> */}
      <Register />

    </div>
  );
}

export default App;

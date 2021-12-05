import { useEffect, useState } from "react";

import Login from "./components/Login";



function App() {

  const [ credentials, setCredentials ] = useState({
    isLoggedIn: false,
    bearer: ""
  });

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
    <div className="App">
      <Login login={login}/>

    </div>
  );
}

export default App;

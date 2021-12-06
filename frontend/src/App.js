import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { makeHttpRequest } from './adapters/requests';
import AuthProvider, { useAuth } from "./contexts/AuthProvider";
import GlobalStyle from "./styles/GlobalStyles";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";

    // useEffect(() => {
    //     const requestBody = {
    //         query: `
    //           query {
    //             checkAuth {
    //                 username
    //                 email
    //             }
    //         `
    //       }
    //     makeHttpRequest(requestBody)
    //     .then(res => {
    //         if(!res.data) {
    //             return console.log(res.errors)
    //         }
    //         console.log(res)
    //         signIn(res.data.checkAuth, () => console.log('logged in'))
    //     })
    //     .catch(err => console.error(err))

    // }, [])


function App() {

  // const auth = useAuth()
  //     useEffect(() => {
  //       const requestBody = {
  //           query: `
  //             query {
  //               checkAuth {
  //                   username
  //                   email
  //               }
  //             }
  //           `
  //         }
  //       makeHttpRequest(requestBody)
  //       .then(res => {
  //           if(!res.data) {
  //               return console.log(res.errors)
  //           }
  //           console.log(res)
  //           auth.signIn(res.data.checkAuth, () => console.log('logged in'))
  //       })
  //       .catch(err => console.error(err))

  //   }, [])

  return (
    <AuthProvider>
      <div className="App">
        <GlobalStyle />
          <Routes>
            <Route path="/" element={<div>this is a public page</div>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <div>you made it</div>
                </RequireAuth>
              }
            />
            <Route
              path="/extraprotected"
              element={
                <RequireAuth>
                  <div>you made it to something super secret</div>
                </RequireAuth>
              }
            />
          </Routes>

      </div>
    </AuthProvider>
  );
}

export default App;

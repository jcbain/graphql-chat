import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { makeHttpRequest } from './adapters/requests';
import AuthProvider, { useAuth } from "./contexts/AuthProvider";
import GlobalStyle from "./styles/GlobalStyles";
import RequireAuth from "./components/RequireAuth";
import RequiredOut from './components/RequiredOut';
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Messages from './components/Messages';


function App() {
  const auth = useAuth();




  return (
    // <AuthProvider>
      <div className="App">
        <GlobalStyle />
          <Routes>
            <Route path="/" element={<div>this is a public page</div>}/>
            <Route path="/login" element={
              <RequiredOut>
                <Login />
              </RequiredOut>
            }/>
            <Route path="/register" element={<Register />}/>
            <Route
              path="/messages"
              element={
                <RequireAuth>
                  <Messages />
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
    // </AuthProvider>
  );
}

export default App;

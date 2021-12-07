import { Route, Routes } from 'react-router-dom';

import GlobalStyle from "./styles/GlobalStyles";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Messages from './components/Messages';
import Home from './components/Home';


function App() {

  return (
      <div className="App">
        <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={
              <Login />
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
  );
}

export default App;

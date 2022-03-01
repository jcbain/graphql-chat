import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "./styles/GlobalStyles";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Home from './components/Home';
import MessageController from './components/controllers/MessageController';

const colors = ['#5900ff', '#00d985', '#303030']

const theme = {
   mainOutlineColor: colors[2],
   primaryMessageTextColor: colors[1],
   secondaryMessageTextColor: colors[0]
};

function App() {

  return (
    <ThemeProvider theme={theme}>
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
                  <MessageController />
                </RequireAuth>
              }
            />
          </Routes>

      </div>
      </ThemeProvider>
  );
}

export default App;

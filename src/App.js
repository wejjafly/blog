
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import {db, auth} from "./db"
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Blog from "./routes/Blog";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import { MenuItem } from "./components/MenuItem";
import {PageLayout} from "./components/PageLayout"
import "./App.css";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  
  onAuthStateChanged(auth, (user) => {
    console.log('auth changed');
    if (user) {
      setIsAuth(user.email);
    } else {
      setIsAuth(false);
    }
  });
  return (
    <>
    <BrowserRouter>
      <PageLayout
        menuContent={
          <>
            <MenuItem to="/">Panel logowania</MenuItem>
            <MenuItem to="/blog">Blog</MenuItem>
            <MenuItem to="/dashboard" end>
              Panel użytkownika
            </MenuItem>
          </>
        }
      >
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route
            path="/dashboard"
            element={
              !isAuth ? <Navigate to="/" /> : <Dashboard user={isAuth} />
            }
          />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  </>
);
}

export default App;

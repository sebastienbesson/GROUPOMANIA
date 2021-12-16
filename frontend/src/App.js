import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import CreatePost from './pages/CreatePost';
import CreateComment from './pages/CreateComment';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  const [token, setToken] = useState();
  if(!localStorage.getItem(token, setToken)) {
    return <CreateComment setToken={setToken} />
  }
  if(!localStorage.getItem(token, setToken)) {
    return <Home setToken={setToken} />
  }
  if(!localStorage.getItem(token, setToken)) {
    return <CreatePost setToken={setToken} />
  }
  
  if(!localStorage.getItem(token, setToken)) {
    return <Connect setToken={setToken} />
  }
  if(!localStorage.getItem(token, setToken)) {
    return <Subscribe setToken={setToken} />
  }
  
  
 
  return (

    <Router>
      <Header>  
        <Link to="/">Home</Link>
        <Link to="/Connect">Connexion</Link>
        <Link to="/Subscribe">Inscription</Link>
      </Header>
      <Routes>
        <Route path="Home" element={<Home setToken={setToken}/>} />
        <Route path="Connect" element={<Connect setToken={setToken}/>} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Preferences" element={<Preferences />} />    
        <Route path="Subscribe" element={<Subscribe setToken={setToken}/>} />
        <Route path="CreatePost" element={<CreatePost setToken={setToken}/>} />
        <Route path="CreateComment" element={<CreateComment setToken={setToken}/>} />
      </Routes>
    </Router>
  )
}
export default App;
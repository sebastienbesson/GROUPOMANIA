import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import useToken from './components/App/useToken';
import "./App.css";


function App() {
  const { token, setToken } = useToken();
 
  if(!token) {
    return <Connect setToken={setToken} />
  }
  return (

    <Router>
      <nav>
      <Header />
      <Link to ="/">Accueil</Link>
      <Link to="/Connect">Connexion</Link>
      <Link to="/Subscribe">Inscription</Link> 
      </nav>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="Connect" element={<Connect />} />
    <Route path="Dashboard" element={<Dashboard />} />
    <Route path="Preferences" element={<Preferences />} />    
    <Route path="Subscribe" element={<Subscribe/>} />
    </Routes>
    
    </Router>
  )
}

export default App;

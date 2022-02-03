import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import CreatePost from "./pages/CreatePost";
import CreateComment from "./pages/CreateComment";
import CommentList from "./pages/CommentList";
import GetPost from "./pages/GetPost";
import Like from "./components/Like";
import ChangePassword from "./components/ChangePassword";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [token, setToken] = useState();
  if(!localStorage.getItem('token')) {
    return <Connect setToken={setToken} />
  }
   return (
    <Router>
      <Header>  
        <Link to="/Home">Home</Link>
        <Link to="/Connect">Connexion</Link>
        <Link to="/Subscribe">Inscription</Link>
      </Header>
      <Routes>
        <Route path="Connect" element={<Connect setToken={setToken}/>} />
        <Route path="Home" element={<Home setToken={setToken}/>} />
        <Route path="Subscribe" element={<Subscribe setToken={setToken}/>} />
        <Route path="CreatePost" element={<CreatePost setToken={setToken}/>} />
        <Route path="GetPost/:id" element={<GetPost />} />
        <Route path="CreateComment" element={<CreateComment setToken={setToken}/>} />
        <Route path="CommentList" element={<CommentList />} />
        <Route path="Like" element={<Like />} />
        <Route path="ChangePassword" element={<ChangePassword setToken={setToken}/>} />
      </Routes>
    </Router>
  )
}
export default App;
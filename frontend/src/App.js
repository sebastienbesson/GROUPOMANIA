import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Account from './pages/Account';
import ChangePassword from "./components/ChangePassword";
import Connect from "./pages/Connect";
import CreateComment from "./pages/CreateComment";
import CreatePost from "./pages/CreatePost";
import Disconnect from "./components/Disconnect";
import GetPost from "./pages/GetPost";
import GetPostByUser from "./pages/GetPostByUser";
import GetUser from "./components/GetUser";
import Header from "./components/Header";
import Home from "./pages/Home";
import ModifyComment from "./components/ModifyComment";
import ModifyPost from "./components/ModifyPost";
import ModifyUserAccount from "./components/ModifyUserAccount";
import PrivateRoute from "./components/PrivateRoute";
import Subscribe from "./pages/Subscribe";

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
 
   return (
    <Router>
      <Header>  
        <Link to="/Account">Mon compte</Link>
        <Link to="/Connect">Connexion</Link>
        <Link to="/Disconnect">Déconnexion</Link>
        <Link to="/Home">Accueil</Link>
        <Link to="/Subscribe">Inscription</Link>
      </Header>
      <Routes>
        <Route path='/Connect' element={<Connect />} />
        <Route path='/Subscribe' element={<Subscribe />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/Account' element={<Account />} />
          <Route path='/ChangePassword/:id' element={<ChangePassword />} />
          <Route path='/CreateComment/:postId' element={<CreateComment />} />
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/Disconnect' element={<Disconnect />} />
          <Route path='/GetPost/:id' element={<GetPost />} />
          <Route path='/GetUser/:id' element={<GetUser />} />
          <Route path='/GetPostByUser/:id' element={<GetPostByUser />} />
          <Route path='/Home' element={<Home />} />  
          <Route path='/ModifyComment/:id' element={<ModifyComment />} />
          <Route path='/ModifyPost/:id' element={<ModifyPost />} />
          <Route path='/ModifyUserAccount/:id' element={<ModifyUserAccount />} />             
        </Route>
      </Routes>
    </Router>
  )
}
export default App;




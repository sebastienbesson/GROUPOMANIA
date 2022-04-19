import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import Account from './pages/Account';
import CreatePost from "./pages/CreatePost";
import CreateComment from "./pages/CreateComment";
import GetPost from "./pages/GetPost";
import ChangePassword from "./components/ChangePassword";
import ModifyUserAccount from "./components/ModifyUserAccount";
import Disconnect from "./components/Disconnect";
import ModifyPost from "./components/ModifyPost";
import ModifyComment from "./components/ModifyComment";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
 
   return (
    <Router>
      <Header>  
        <Link to="/Home">Accueil</Link>
        <Link to="/Connect">Connexion</Link>
        <Link to="/Disconnect">Déconnexion</Link>
        <Link to="/Subscribe">Inscription</Link>
        <Link to="/Account">Mon compte</Link>
      </Header>
      <Routes>
        <Route path='/Connect' element={<Connect />} />
        <Route path='/Subscribe' element={<Subscribe />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/Home' element={<Home />} />  
          <Route path='/ModifyUserAccount/:id' element={<ModifyUserAccount />} />   
          <Route path='/ChangePassword/:id' element={<ChangePassword />} />
          <Route path='/Disconnect' element={<Disconnect />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/GetPost/:id' element={<GetPost />} />
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/CreateComment/:postId' element={<CreateComment />} />
          <Route path='/ModifyPost/:id' element={<ModifyPost />} />
          <Route path='/ModifyComment/:id' element={<ModifyComment />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App;




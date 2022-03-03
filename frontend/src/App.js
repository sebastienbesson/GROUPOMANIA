import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import CreatePost from "./pages/CreatePost";
import CreateComment from "./pages/CreateComment";
import GetPost from "./pages/GetPost";
//import Like from "./components/Like";
import ChangePassword from "./components/ChangePassword";
import Disconnect from "./components/Disconnect";
import ModifyPost from "./components/ModifyPost";
import ModifyComment from "./components/ModifyComment";

//import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

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
        <Link to="/Home">Accueil</Link>
        <Link to="/Connect">Connexion</Link>
        <Link to="/Disconnect">Déconnexion</Link>
        <Link to="/Subscribe">Inscription</Link>
      </Header>
      
      
        <Routes>
        
        <Route exact element={<PrivateRoute  />}>
          
          <Route exact path="/Home" element={<Home />} />
            <Route path="/Disconnect" element={<Disconnect />} />
          </Route>
          <Route path='/Connect' element={<Connect />} />
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/CreateComment/:postId' element={<CreateComment />} />
          <Route path='/GetPost/:id' element={<GetPost />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path='/ModifyPost' element={<ModifyPost />} />
          <Route path='/ModifyComment' element={<ModifyComment />} />
          <Route />
          
        </Routes> 
	   
        
	          
	      
        
      
    </Router>
  )
}
export default App;

        /*<Route path="Connect" element={<Connect setToken={setToken}/>} />
        <Route path="Home" element={<Home setToken={setToken}/>} />
        <Route path="Subscribe" element={<Subscribe setToken={setToken}/>} />
        <Route path="CreatePost" element={<CreatePost setToken={setToken}/>} />
        <Route path="GetPost/:id" element={<GetPost />} />
        <Route path="CreateComment/:postId" element={<CreateComment setToken={setToken}/>} />
        <Route path="Like" element={<Like />} />
        <Route path="Disconnect" element={<Disconnect setToken={setToken}/>} />
        <Route path="ChangePassword" element={<ChangePassword setToken={setToken}/>} />
        <Route path="ModifyPost" element={<ModifyPost setToken={setToken}/>} />
        <Route path="ModifyComment/:id" element={<ModifyComment setToken={setToken}/>} />*/

        /*<Route element={<PublicRoute><Connect/></PublicRoute>} exact path="Connect"></Route>
        <Route element={<PublicRoute><Subscribe/></PublicRoute>} path="Subscribe"></Route>
        <Route element={<PrivateRoute><Home/></PrivateRoute>} path="Home"></Route>
        <Route element={<PrivateRoute><GetPost/></PrivateRoute>} path="GetPost/:id"></Route>
        <Route element={<PrivateRoute><CreatePost/></PrivateRoute>} path="CreatePost"></Route>
        <Route element={<PrivateRoute><CreateComment/></PrivateRoute>} path="CreateComment"></Route>
        <Route element={<PrivateRoute><ModifyPost/></PrivateRoute>} path="ModifyPost"></Route>
        <Route element={<PrivateRoute><ModifyComment/></PrivateRoute>} path="ModifyComment/:id"></Route>
        <Route element={<PrivateRoute><ChangePassword/></PrivateRoute>} path="ChangePassword"></Route>
        <Route element={<PrivateRoute><Disconnect/></PrivateRoute>} path="Disconnect"></Route>
        <Route element={<PrivateRoute><Like/></PrivateRoute>} path="Like"></Route>*/
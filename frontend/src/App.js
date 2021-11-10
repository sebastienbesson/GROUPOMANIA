import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Subscribe from "./pages/Subscribe";
import "./App.css"


function App() {
  return (

    <Router>
      <nav>
      <Header />
      <Link to="/Connect">Connexion</Link>
      <Link to="/Subscribe">Inscription</Link> 
      </nav>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="Connect" element={<Connect />} />
    <Route path="Subscribe" element={<Subscribe/>} />
    </Routes>
    
    </Router>
  )
}

export default App;

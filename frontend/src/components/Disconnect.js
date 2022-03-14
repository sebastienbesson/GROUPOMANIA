import { Component } from "react";
import '../styles/Disconnect.css';

export default class Disconnect extends Component {
    logout = () => {
    localStorage.clear();
    window.location = "./Connect";
    }
    render() {
    return (
    <div className="disconnect-wrapper">
      <button class="disconnect-btn" onClick={this.logout}>Déconnexion</button>
    </div>
    )
  }
}

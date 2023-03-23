import { Component } from "react";
import  {MenuData } from "./Menu_Data";

import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
// import styles from "./SignUp.module.css";
// import styles from "./Navbar.module.css";
import "./Navbar.css"


function logout() {
	if (localStorage.getItem('token')){
		localStorage.removeItem('token')
	}
	return window.location.href = '/'
}

class NavLogin extends Component {
  state = {clicked: false};
  handleClick = ()=> {
    this.setState({clicked: !this.state.clicked})
  }
  render(){
    return(
        
      <nav className="NarbarItems">
        <Link to="/dashboard"> <h1 className="logo">
          Mindscapes 
        </h1></Link>
        <div className="menu-icons"
        onClick={this.handleClick}>
          <i 
          className={this.state.clicked ? 
          "fas fa-times" : 
          "fas fa-bars"}>

          </i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
        <li id="ink" onClick={logout}>Log out</li>
        </ul>
      </nav>
      
    )
  }
}

export default NavLogin;

import { Component } from "react";
import { MenuData } from "./MenuData";
import "./NavbarStyles.css";
import { Link } from 'react-router-dom';
// import'./NavbarStyles.module.css'

class Navbar extends Component {
  state = {clicked: false};
  handleClick = ()=> {
    this.setState({clicked: !this.state.clicked})
  }
  render(){
    return(
        
        
      <nav className="NarbarItems">
        <Link to="/"> <h1 className="logo">
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
          {MenuData.map((item, index)=>{
            return(
              <li key={index}>
                <a href={item.url} 
                className={item.cName}>{item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      
    )
  }
}

export default Navbar;

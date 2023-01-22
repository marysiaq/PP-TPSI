import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import AuthService from "../services/auth.service";




export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user);

    if (user) {
      this.setState({
        currentUser: user,
        
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      
      currentUser: undefined,
    });
  }



  render(){
  return (
    <>
      <nav  className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
         
          <li className="nav-item">
            <Link to="/recipelist" className="nav-link">Lista przepisów</Link>
          </li>

          <li className="nav-item">
            <Link to="/ranking" className="nav-link">Ranking</Link>
          </li>
          
        </div>
        {this.state.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {this.state.currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Wyloguj
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Logowanie
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Rejestracja
                </Link>
              </li>
            </div>
          )}
      </nav>

      
      
    </>
  )}
};


import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            Profil użytkownika <strong>{this.state.currentUser.username}</strong> 
          </h3>
        </header>
        <p>
          <strong>Email:</strong>{" "}
          {this.state.currentUser.email}
        </p>
        
      </div>: null}
      </div>
    );
  }
}

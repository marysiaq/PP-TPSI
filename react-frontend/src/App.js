
import './App.css';

import {  Routes, Route } from "react-router-dom";
import AddRecipe from './components/AddRecipe';

import ShowRecipe from './components/ShowRecipe';
import RecipeList from './components/RecipeList';

import Error404 from './components/Error404';
import EditRecipe from './components/EditRecipe';
import Error500 from './components/Error500';
import Ranking from './components/Ranking';
import Login from './components/Login'
import Register from './components/Register';
import Profile from './components/Profile'

import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from 'react';
import AuthService from "./services/auth.service";
import { Link } from 'react-router-dom';
import Error401 from './components/Error401';
import { NoMatch } from './components/NoMatch';




class App extends Component {
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
          <Link to={"/"} className="navbar-brand">
            Kisiążka kucharska
          </Link>
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
      <div className="container mt-3">
      <Routes>
        <Route path='/'element={<RecipeList  />}/>
        <Route path="recipelist" element={<RecipeList />} />
        <Route path="recipelist/details/:id" element={<ShowRecipe/>}/>
        <Route path="recipelist/edit/:id"  element={<EditRecipe/>}/>
        <Route path="recipelist/add" element={<AddRecipe/>}/>
        <Route path="/ranking" element={<Ranking/>}/>
        <Route path="/error404" element={<Error404/>}/>
        <Route path="/error500" element={<Error500/>}/>
        <Route path="/error401" element={<Error401/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile logout={this.logOut} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      </div>
      <footer class="card text-center">
      <div class="card-body">
        
        <p class="card-text">Kisiążka kucharska</p>
      </div>
      </footer>
    </>
)}}

export default App;

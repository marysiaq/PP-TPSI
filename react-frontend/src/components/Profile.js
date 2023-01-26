import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import RecipeService from "../services/recipe.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      likedRecipes:[],
      currentUser: { }
    };
    this.handleDelete=this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);

    if (!currentUser) this.setState({ redirect: "/login" });
    

    const response = await RecipeService.getLikedRecipes(currentUser.id);
    if(response.status===200){
      const body = response.data;
      console.log(body);
      this.setState({ currentUser: currentUser, userReady: true ,likedRecipes:body})
    }
    if(response.status===401){
      this.props.logout();
      this.setState({ redirect: "/" });
    }

  }
  async handleDelete(e){
    const response = await UserService.deleteUser(this.state.currentUser.id);
    console.log(response);
    if(response.status===200){
      
      alert("Konto zostało usunięte");
      this.props.logout();
      this.setState({ redirect: "/" });
      
    }
    if(response.status===500){
      this.setState({ redirect: "/error500" });
    }
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
        {this.state.currentUser.roles.includes("ROLE_USER")&&<button onClick={this.handleDelete}>Usuń konto</button>}
          
          <h3>Polubione przepisy:</h3>
          {this.state.likedRecipes.length>0?
           <>
              <table className="table table-bordered table-striped table-hover">
            <thead className="thead-light">
                <tr>
                    <th scope="col"><b>Nazwa</b></th>
                   
                </tr>
            </thead>
            <tbody>
                {this.state.likedRecipes!==null&&
                
                this.state.likedRecipes.map((recipe)=>(
                        <tr  key={recipe.id}>
                            <td>{recipe.name}</td>
                            <td><Link className="btn btn-primary" to={`/recipelist/details/${recipe.id}`}> Szczegóły</Link></td>
                            
                        </tr> 
                    ))
            }
            </tbody>
        </table>
           </>:<p>Brak polubień!</p>
          }
        
      </div>: null}
      </div>
    );
  }
}

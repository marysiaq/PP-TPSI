import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeService from '../services/recipe.service'
export default function Ranking(props){
    const [recipes,setRecipes] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await RecipeService.getranking(); //await fetch('/recipe/getranking',{method:"GET"});
            if ( response.status===200 ) {
                const body = await response.data;

                if(body.ranking.length>0)setRecipes(body);
                console.log(body);
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if ( response.status===500 ) {
                navigate("/error500");
            }


        }
        fetchData();
    },[]);

    return(<div className="container">
        {recipes!==null?
            <div>
                <h1 className="jumbotron">Ranking przepisów</h1>
                <table className="table table-bordered table-striped table-hover">
                <thead className="thead-light">
                    <tr ><th scope="col"> # </th><th scope="col"> </th><th scope="col">Polubienia:</th></tr>
                </thead>
                
                    <tbody>
                        {
                            recipes.ranking.map((recipe,index)=>(<tr scope="row" key={index}><td><b>{index + 1}.</b></td><td>{recipe.recipeName}</td><td>{recipe.amount}</td><td><Link to={`/recipelist/details/${recipe.recipeId}`}> Szczegóły</Link></td></tr>))
                        }
                    </tbody>
                </table>
            </div>
            :<h3>Brak danych</h3>
        }
    </div>);

}
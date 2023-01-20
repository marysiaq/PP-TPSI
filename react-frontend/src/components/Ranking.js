import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Ranking(props){
    const [recipes,setRecipes] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/recipe/getranking',{method:"GET"});
            if ( response.ok ) {
                const body = await response.json();
                setRecipes(body);
                console.log(body);
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if ( response.status===404 ) {
                navigate("/error500");
            }


        }
        fetchData();
    },[]);

    return(<div>
        {recipes!==null?
            <div>
                <h1>Ranking przepisów</h1>
                <table>
                    <tbody>
                        {
                            recipes.ranking.map((recipe,index)=>(<tr key={index}><td><b>{index + 1}.</b></td><td>{recipe.recipeName}</td><td>{recipe.amount}</td><td><Link to={`/recipelist/details/${recipe.recipeId}`}> Szczegóły</Link></td></tr>))
                        }
                    </tbody>
                </table>
            </div>
            :<h3>Brak danych</h3>
        }
    </div>);

}
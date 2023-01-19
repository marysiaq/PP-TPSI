import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function RecipeList(props){
    const [recipes,setRecipes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('/recipe/list',{method:"GET"});
            if ( response.ok ) {
                const body = await response.json();
                setRecipes(body);
                console.log(body);
            }

        }
        fetchData();
    },[]);
    return(
    <div>
        <Link to="add">Dodaj przepis</Link>
        <table>
            <thead>
                <tr>
                    <th><b>Nazwa</b></th>
                    <th><b>Poziom trudności</b></th>
                    <th><b>Czas przygotownia</b></th>
                    <th><b>Ilość porcji</b></th>
                    <th><b>Dla wegan</b></th>
                </tr>
            </thead>
            <tbody>
                {recipes!==null&&
                
                    recipes.map((recipe)=>(
                        <tr  key={recipe.id}>
                            <td>{recipe.name}</td>
                            <td>{recipe.difficultyLevel}</td>
                            <td>{recipe.preparationTime}</td>
                            <td>{recipe.portions}</td>
                            {recipe.forVegans?<td>tak</td>:<td>nie</td>}
                            <td><Link to={`details/${recipe.id}`}> Szczegóły</Link></td>
                            <td></td>
                            <td></td>
                        </tr> 
                    ))
            }
            </tbody>
        </table>
    </div>);

}
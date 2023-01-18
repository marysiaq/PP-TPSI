import React, { useState,useEffect } from "react";
export default function ShowRecipe(props){
    const [id,setId] = useState(props.recipeId);
    const[recipe,setRecipe] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('/recipe/get/'+id,{method:"GET"});
            if ( response.ok ) {
                const body = await response.json();
                setRecipe(body);
                console.log(body);
            }

        }
        fetchData();
    },[]);

    return(
        <div>
           {recipe!==null&&
            <div>
                <h2>{recipe.name}</h2>
                
                <p><b>Poziom trudności: </b>  {recipe.difficulty.level}</p>
                <h4>Kategorie:</h4>
                {
                        recipe.categories.map((category) => (
                            <p key={category.id} >{category.name}</p>
                        ))
                }
                
                <p><b>Ilość porcji:</b> {recipe.portions}</p>
                <p><b>Czas przygotowania: </b> {recipe.preparationTime} min</p>
                <p><b>Odpowiedni dla wegan: </b> {recipe.forVegans?<i>tak</i>:<i>nie</i>}</p>
                <h3>Składniki:</h3>
                <ul>
                    {
                        recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.id} >{ingredient.name} - {ingredient.amount} {ingredient.unit.name}</li>
                        ))
                    }
                </ul>
                <h3>Przygotowanie:</h3>
                <p>{recipe.preparation}</p>
                {recipe.photo===null?<span><i>Brak zdjęcia</i></span>:
                <>
                    <h4>Zdjęcie:</h4>
                    <img width="350" alt="gotowe jedzonko" src={`data:image/jpeg;base64,${recipe.photo.photoContent}`}/>
                </>
                }
                
                
                <p><b>Data dodania:</b> {recipe.dateAdded}</p>
            </div>
           } 

           
        </div>
    );
}
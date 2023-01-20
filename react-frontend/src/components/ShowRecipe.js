import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function ShowRecipe(props){
    const {id} = useParams();
    const navigate = useNavigate();
    const[recipe,setRecipe] = useState(null);
    const [likes,setLikes] = useState(0);
    const [liked,setLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(id);

            const response = await fetch('/recipe/get/'+id,{method:"GET"});
            if ( response.ok ) {
                const body = await response.json();
                setRecipe(body);
                console.log(body);
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if ( response.status===500 ) {
                navigate("/error500");
            }

            const response2 = await fetch('/recipe/getrecipelikes/'+id,{method:"GET"});
            if ( response2.ok ) {
                const body = await response2.json();
                setLikes(body);
                console.log(body);
            }
            if ( response2.status===404 ) {
                navigate("/error404");
            }
            if ( response2.status===500 ) {
                navigate("/error500");
            }

        }
        fetchData();
    },[]);
    //const onClickHandler = (e) =>
    const handleDelete =async (e)=>{
        if(!window.confirm("Czy napewno chcesz usunąć ten przepis?"))return;
        const response = await fetch('/recipe/delete/'+id,{method:"DELETE"});
            if ( response.ok ) {
                navigate("/recipelist");
            }
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }

    }

    const handleLike = async (e)=>{
        const response = await fetch('/recipe/like/'+id,{method:"POST"});
            
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }

        setLiked(true);
        setLikes(likes+1);

    }

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
                <p><b>Polubienia:</b> {likes}</p>
                <div>
                    {liked?<p>Polubiono przepis!</p>:<button onClick={handleLike}>Polub przepis</button>}
                </div>
                <Link to={`/recipelist/edit/${recipe.id}`}>Edytuj</Link>
                <button onClick={handleDelete}>Usuń</button>
            </div>
           } 
        </div>
    );
}
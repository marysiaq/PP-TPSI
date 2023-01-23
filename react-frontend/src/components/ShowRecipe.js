import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeService from "../services/recipe.service";
import AuthService from "../services/auth.service";

export default function ShowRecipe(props){
    const {id} = useParams();
    const navigate = useNavigate();
    const[recipe,setRecipe] = useState(null);
    const [likes,setLikes] = useState(0);
    const [liked,setLiked] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = AuthService.getCurrentUser();
            setCurrentUser(currentUser);
            if(currentUser!==null){
                const response =  await RecipeService.findLike(id,currentUser.id);
                if ( response.status ===200 ) {
                    const body = await response.data;
                    setLiked(body);
                    //console.log(body);
                }
            }

  

            const response =  await RecipeService.getRecipe(id);//await fetch('/recipe/get/'+id,{method:"GET"});
            if ( response.status ===200 ) {
                const body = await response.data;
                setRecipe(body);
                console.log(body);
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if ( response.status===500 ) {
                navigate("/error500");
            }

            const response2 =await RecipeService.getRecipeLikes(id);// await fetch('/recipe/getrecipelikes/'+id,{method:"GET"});
            if ( response2.status ===200 ) {
                const body = await response2.data;
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

    const handleDelete =async (e)=>{
        if(!window.confirm("Czy napewno chcesz usunąć ten przepis?"))return;
        const response =await RecipeService.deleteRecipe(id)//await fetch('/recipe/delete/'+id,{method:"DELETE"});
            if ( response.status ===200 ) {
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
        console.log(currentUser.id)
        const response =await RecipeService.likeRecipe(id,currentUser.id) //await fetch('/recipe/like/'+id,{method:"POST"});
            console.log(response);
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }

        setLiked(true);
        setLikes(likes+1);

    }
    const handleUnLike = async (e)=>{
        //console.log(currentUser.id)
        const response =await RecipeService.unlikeRecipe(id,currentUser.id) //await fetch('/recipe/like/'+id,{method:"POST"});
            //console.log(response);
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }
            if(response.status===200){
                setLiked(false);
                setLikes(likes-1);
            }

       
    }

    return(
        <div className="container">  
           {recipe!==null&&
            <div>
                <h2 className="jumbotron">{recipe.name}</h2>
                
                <p><b>Poziom trudności: </b>  {recipe.difficulty.level}</p>
                <p><b>Kategorie:</b></p>
                {
                        recipe.categories.map((category) => (
                            <li key={category.id} >{category.name}</li>
                        ))
                }
                <br/>
                <p><b>Ilość porcji:</b> {recipe.portions}</p>
                <p><b>Czas przygotowania: </b> {recipe.preparationTime} min</p>
                <p><b>Odpowiedni dla wegan: </b> {recipe.forVegans?<i>tak</i>:<i>nie</i>}</p>
                <p><b>Składniki:</b></p>
                <ul>
                    {
                        recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.id} >{ingredient.name} - {ingredient.amount} {ingredient.unit.name}</li>
                        ))
                    }
                </ul>
                <p><b>Przygotowanie:</b></p>
                <p>{recipe.preparation}</p>
                {recipe.photo===null?<span><i>Brak zdjęcia</i></span>:
                <>
                    <p><b>Zdjęcie:</b></p>
                    <img width="350" alt="gotowe jedzonko" src={`data:image/jpeg;base64,${recipe.photo.photoContent}`}/>
                </>
                }
                
                
                <p><b>Data dodania:</b> {recipe.dateAdded}</p>
                <div>
                <p><b>Polubienia:</b> {likes}</p>
                {currentUser!==null&&  
                    <div>
                        {liked?<button className="btn btn-primary" onClick={handleUnLike}>Anuluj polubienie</button>:<button className="btn btn-primary" onClick={handleLike}>Polub przepis</button>}
                    </div>
                }
                </div>

                <br/>

                {(currentUser!==null&&currentUser.roles.includes('ROLE_ADMIN'))&&
                   <div>
                    <Link className="btn btn-primary" to={`/recipelist/edit/${recipe.id}`}>Edytuj </Link>
                    <button className="btn btn-primary"  onClick={handleDelete}> Usuń</button>
                    </div>
                }           
            </div>
           } 
        </div>
    );
}
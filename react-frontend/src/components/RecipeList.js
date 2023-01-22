import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import DifficultyLevels from "./DifficultyLevels";

import RecipeService from '../services/recipe.service'


export default function RecipeList(props){
    const [recipes,setRecipes] = useState(null);
    const [categories_id,setCategories_id] = useState([]);
    const [difficulty_id,setDifficulty_id] = useState(0);
    const [searchName,setSearchName] = useState("");
    const [searchTimeMin,setSearchTimeMin] = useState(0);
    const [searchTimeMax,setSearchTimeMax] = useState(0);



    useEffect(() => {
        const lista = [1,2,3]
        console.log(lista.toString());
        const fetchData = async () => {

            const response = await RecipeService.getPublicContent("");//await fetch('/recipe/list',{method:"GET"});
            if ( response.status===200 ) {
                const body =  response.data;
                setRecipes(body);
                //console.log(body);
            }

        }
        fetchData();
    },[]);
    const handleOnChangeCategories = (e) => {
        let newArray = categories_id.slice();
        if(newArray.includes(parseInt(e.target.value))) {newArray=newArray.filter((item) => item !== parseInt(e.target.value));}
        else{newArray.push(parseInt(e.target.value));}
        setCategories_id(newArray);
    }

    const handleOnChangeDifficulty = (e)=>{
        console.log(parseInt(e.target.value));
        setDifficulty_id(parseInt(e.target.value))

    }

    const handleSearch = async () =>{
        //console.log(searchName,searchTimeMax,searchTimeMin,categories_id,difficulty_id);
        var filters = "?";
        if(searchName!=="")filters=filters+"phrase="+searchName+"&"
        if(searchTimeMin!==0)filters=filters+"min="+searchTimeMin+"&"
        if(searchTimeMax!==0)filters=filters+"max="+searchTimeMax+"&"
        if(difficulty_id!==0)filters=filters+"difficultyId="+difficulty_id+"&"
        if(categories_id!==[]){
            categories_id.forEach((id)=>filters=filters+"categoriesIds="+id+"&");
        }

        const response = await RecipeService.getPublicContent(filters);//await fetch('/recipe/list'+filters,{method:"GET"});
        console.log(response);
        if ( response.status===200 ) {
                const body = await response.data;
                setRecipes(body);
                console.log(body);
            }


        setSearchName("");
        setCategories_id([]);
        setDifficulty_id(0);
        setSearchTimeMax(0);
        setSearchTimeMin(0);
    }
    
    return(
    <div>
        <h1>Lista przepisów</h1>
        <div>
            <h2>Wyszukiwarka</h2>
            <h3>Nazwa</h3><input type="text" value={searchName} onChange={e => setSearchName(e.target.value)}/>
            <h3>Czas przygotowania</h3>
            <label><b>Minimalny:</b><input type="number" min="0" value={searchTimeMin} onChange={e => setSearchTimeMin(e.target.value)} /></label>
            <label><b>Maksymalny:</b><input type="number" min="0" value={searchTimeMax} onChange={e => setSearchTimeMax(e.target.value)}/></label>
            <Categories
                value={categories_id}
                onChangeValue={handleOnChangeCategories}></Categories>

            <DifficultyLevels value={difficulty_id}
                             onChangeValue={handleOnChangeDifficulty} ></DifficultyLevels>
            <br/>
            <button onClick={handleSearch}>Szukaj</button>
        </div>
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
import React, {useState, useEffect} from "react";
import Categories from "./Categories";
import DifficultyLevels from "./DifficultyLevels";
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../services/auth.service'
import RecipeService from '../services/recipe.service'
import "bootstrap/dist/css/bootstrap.min.css";


export default function RecipeList(props){
    const [recipes,setRecipes] = useState(null);
    const [categories_id,setCategories_id] = useState([]);
    const [difficulty_id,setDifficulty_id] = useState(0);
    const [searchName,setSearchName] = useState("");
    const [searchTimeMin,setSearchTimeMin] = useState(0);
    const [searchTimeMax,setSearchTimeMax] = useState(0);
    const navigate = useNavigate();
    const [currentUser,setCurrentUser] = useState(null);



    useEffect(() => {
        
        const fetchData = async () => {

            const response = await RecipeService.getPublicContent("");//await fetch('/recipe/list',{method:"GET"});
            if ( response.status===200 ) {
                const body =  response.data;
                setRecipes(body);
                //console.log(body);
            }

            const currentUser = AuthService.getCurrentUser();
            //console.log(currentUser);
            setCurrentUser(currentUser)
            

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
    <div className="container">
        <h1 className="jumbotron" >Lista przepis??w</h1>
        <div>
            <h2>Wyszukiwarka</h2>
            <div className="form-row">
            <div className="col">
                <label><b>Nazwa</b></label>
                <input className="form-control" type="text" value={searchName} onChange={e => setSearchName(e.target.value)}/>
            </div>
            </div>
            {currentUser!==null&&<>
                <label><b>Czas przygotowania</b></label> 
                <div className="form-row">
                    
                    <div className="col"><label>Minimalny:</label><input className="form-control" type="number" min="0" value={searchTimeMin} onChange={e => setSearchTimeMin(e.target.value)} /></div>
                    <div className="col"><label>Maksymalny:</label><input  className="form-control" type="number" min="0" value={searchTimeMax} onChange={e => setSearchTimeMax(e.target.value)}/></div>
                </div>

                <Categories
                    value={categories_id}
                    onChangeValue={handleOnChangeCategories}></Categories>

                <DifficultyLevels value={difficulty_id}
                             onChangeValue={handleOnChangeDifficulty} ></DifficultyLevels>
            </> }
                <br/>

            <button className="btn btn-primary " onClick={handleSearch}>Szukaj</button>
        </div>
        <br/>
        {currentUser!==null&&
        <div>
            {(currentUser.roles.includes("ROLE_ADMIN")) && 
                <Link className="btn btn-primary" to="/recipelist/add">Dodaj przepis</Link>}
                
        </div>
        }
        <table className="table table-bordered table-striped table-hover">
            <thead className="thead-light">
                <tr>
                    <th scope="col"><b>Nazwa</b></th>
                    <th scope="col"><b>Poziom trudno??ci</b></th>
                    <th scope="col"><b>Czas przygotownia</b></th>
                    <th scope="col"><b>Ilo???? porcji</b></th>
                    <th scope="col"><b>Dla wegan</b></th>
                    <th scope="col"><b>   </b></th>
                </tr>
            </thead>
            <tbody>
                {recipes!==null&&
                
                    recipes.map((recipe)=>(
                        <tr key={recipe.id}>
                            <td>{recipe.name}</td>
                            <td>{recipe.difficultyLevel}</td>
                            <td>{recipe.preparationTime}</td>
                            <td>{recipe.portions}</td>
                            {recipe.forVegans?<td>tak</td>:<td>nie</td>}
                            <td><Link className="btn btn-primary" to={`/recipelist/details/${recipe.id}`}> Szczeg????y</Link></td>
                        
                        </tr> 
                    ))
            }
            </tbody>
        </table>
    </div>);

}
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../services/auth.service'
import RecipeService from '../services/recipe.service'
import CategoriesService from '../services/categories.service'
import IngredientService from "../services/ingredient.service";
import UnitService from "../services/unit.service";
import "bootstrap/dist/css/bootstrap.min.css";


export default function CategoriesList(props){
    const [categories,setCategories] = useState([]);
    const [nameError, setNameError] = useState("");
    const [nameEditError, setNameEditError] = useState("");
    const [newCategory,setNewCategory] =useState("");
    const [editCategory,setEditCategory] =useState("");
    const [editCategoryForm,setEditCategoryForm] =useState(0);

    const [units,setUnits] = useState([]);
    const [nameUnitError, setNameUnitError] = useState("");
    const [nameUnitEditError, setNameUnitEditError] = useState("");
    const [newUnit,setNewUnit] =useState("");
    const [editUnit,setEditUnit] =useState("");
    const [editUnitForm,setEditUnitForm] =useState(0);


    const navigate = useNavigate();
    const [currentUser,setCurrentUser] = useState(null);



    useEffect(() => {
        
        const fetchData = async () => {

            const response = await RecipeService.getCategories();//await fetch('/recipe/list',{method:"GET"});
            const response2 =await  IngredientService.getUnits();
            if ( response.status===200 ) {
                const body =  response.data;
                setCategories(body);
                console.log(body);
            }
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }

            if ( response2.status===200 ) {
                const body =  response2.data;
                setUnits(body);
                console.log(body);
            }
            if ( response2.status===500 ) {
                navigate("/error500");
            }
            if ( response2.status===404 ) {
                navigate("/error404");
            }
            if(response2.status ===401){
                navigate("/error401");
            }
            console.log(response2);

            const currentUser = AuthService.getCurrentUser();
            if(!currentUser.roles.includes("ROLE_ADMIN"))navigate("/recipelist")
            setCurrentUser(currentUser)
            

        }
        fetchData();
    },[]);

    const handleAddCategory = async (e)=>{
        
        const response = await CategoriesService.createCategory({id:null,name:newCategory});//await fetch('/recipe/list',{method:"GET"});
            if ( response.status===200) {
                setNameError("");
                const body =  response.data;
                
                console.log(body);

                let newCat=categories;
                newCat.push({id:body.id,name:newCategory})
                setCategories(newCat);
                setNewCategory("");
            }
            if(response.status===406){
                let data = response.data;
                if(data.fieldErrors){
                    data.fieldErrors.forEach(fieldError => {
                        if(fieldError.field === 'name'){
                            setNameError(fieldError.message);}
                    })  
                }
            }
            
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }

    }
    const handleEditCategory = async (e)=>{
        console.log(e.target.value)
        const response =  await CategoriesService.updateCategory({id:parseInt(e.target.value),name:editCategory});
        console.log(response);
        if ( response.status===200) {
            setNameEditError("");
            let newArray=categories.slice();
            newArray=newArray.map((item) =>
            {if(item.id === parseInt(e.target.value))return {id:item.id,name:editCategory}
                else return item
            } );

            setCategories(newArray);
            setEditCategory("");
            setEditCategoryForm(0);
        }
        if(response.status===406){
            let data = response.data;
            if(data.fieldErrors){
                data.fieldErrors.forEach(fieldError => {
                    if(fieldError.field === 'name'){
                        setNameEditError(fieldError.message);}
                })  
            }
        }
      
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }


    }

    const handleAddUnit = async (e)=>{
        
        const response = await UnitService.createUnit({id:null,name:newUnit});//await fetch('/recipe/list',{method:"GET"});
            if ( response.status===200) {
                setNameUnitError("");
                const body =  response.data;
                
                console.log(body);

                let newCat=units;
                newCat.push({id:body.id,name:newUnit})
                setUnits(newCat);
                setNewUnit("");
            }
            if(response.status===406){
                let data = response.data;
                if(data.fieldErrors){
                    data.fieldErrors.forEach(fieldError => {
                        if(fieldError.field === 'name'){
                            setNameUnitError(fieldError.message);}
                    })  
                }
            }
            
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }

    }
    const handleEditUnitShowForm = (e)=>{
        let obj = units.find(o => o.id === parseInt(e.target.value));
        setEditUnit(obj.name);
        setEditUnitForm(parseInt(e.target.value))
    }
    const handleEditCategoryShowForm = (e)=>{
        let obj = categories.find(o => o.id === parseInt(e.target.value));
        setEditCategory(obj.name);
        setEditCategoryForm(parseInt(e.target.value))
    }
    
    const handleEditUnit = async (e)=>{
        //let obj = units.find(o => o.id === parseInt(e.target.value));
        //setEditUnit(obj.name);
        console.log(e.target.value)
        const response =  await UnitService.updateUnit({id:parseInt(e.target.value),name:editUnit});
        console.log(response);
        if ( response.status===200) {
            setNameUnitEditError("");
            let newArray=units.slice();
            newArray=newArray.map((item) =>
            {if(item.id === parseInt(e.target.value))return {id:item.id,name:editUnit}
                else return item
            } );

            setUnits(newArray);
            setEditUnit("");
            setEditUnitForm(0);
        }
        if(response.status===406){
            let data = response.data;
            if(data.fieldErrors){
                data.fieldErrors.forEach(fieldError => {
                    if(fieldError.field === 'name'){
                        setNameUnitEditError(fieldError.message);}
                })  
            }
        }
      
            if ( response.status===500 ) {
                navigate("/error500");
            }
            if ( response.status===404 ) {
                navigate("/error404");
            }
            if(response.status ===401){
                navigate("/error401");
            }


    }
    return(
        <div className="container">
            <h3>Kategorie:</h3>
            <div className="col-md-4 mb-3">
                    <label><b>Nazwa kategorii: </b></label>
            <input className="" type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
            <span style={{ color: 'red' }} >{nameError}</span>
            <br/>
            <button className="btn btn-primary"  onClick={handleAddCategory}> Dodaj</button> 
        </div>
        
        <table className="table table-bordered table-striped table-hover">
            <thead className="thead-light">
                <tr>
                    <th scope="col"><b>Nazwa</b></th>
                </tr>
            </thead>
            <tbody>
                {categories!==null&&
                
                
                    categories.map((cat)=>(
                        <tr key={cat.id}>
                            <td>{cat.name}
                            {editCategoryForm!==cat.id &&<button className="btn btn-primary" value={cat.id}  onClick={handleEditCategoryShowForm}>Edytuj</button>}
                            {editCategoryForm===cat.id&&
                                <>
                                <br/>
                                <input className="" type="text" value={editCategory} onChange={e => setEditCategory(e.target.value)} />
                                <span style={{ color: 'red' }} >{nameEditError}</span>
                                <br/> <button className="btn btn-primary"  onClick={handleEditCategory} value={cat.id}> Zapisz</button>
                                <button className="btn btn-primary"  onClick={e => setEditCategoryForm(0)} value={cat.id}> Anuluj</button>
                                </>
                                
                            }
                            </td>
                        </tr> 
                    ))
            }
            </tbody>
        </table>


        <h3>Jednostki:</h3>
            <div className="col-md-4 mb-3">
                    <label><b>Nazwa jednostki: </b></label>
            <input className="" type="text" value={newUnit} onChange={e => setNewUnit(e.target.value)} />
            <span style={{ color: 'red' }} >{nameUnitError}</span>
            <br/>
            <button className="btn btn-primary"  onClick={handleAddUnit}> Dodaj</button> 
        </div>
        
        <table className="table table-bordered table-striped table-hover">
            <thead className="thead-light">
                <tr>
                    <th scope="col"><b>Nazwa</b></th>
                </tr>
            </thead>
            <tbody>
                {units!==null&&
                
                
                    units.map((cat)=>(
                        <tr key={cat.id}>
                            <td>{cat.name}
                            {editUnitForm!==cat.id &&<button className="btn btn-primary" value={cat.id}  onClick={handleEditUnitShowForm}>Edytuj</button>}
                            {editUnitForm===cat.id&&
                                <>
                                <br/>
                                <input className="" type="text" value={editUnit} onChange={e => setEditUnit(e.target.value)} />
                                <span style={{ color: 'red' }} >{nameUnitEditError}</span>
                                <br/> <button className="btn btn-primary"  onClick={handleEditUnit} value={cat.id}> Zapisz</button>
                                <button className="btn btn-primary"  onClick={e => setEditUnitForm(0)} value={cat.id}> Anuluj</button>
                                </>
                                
                            }
                            </td>
                        </tr> 
                    ))
            }
            </tbody>
        </table>
            
        </div>)
}
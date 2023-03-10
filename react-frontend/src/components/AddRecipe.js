
import React from "react";
import Categories from "./Categories";
import AddIngredient from "./AddIngredient";
import ShowIngredients from "./ShowIngredients";
import DifficultyLevels from "./DifficultyLevels";
import UploadFile from "./UploadFile";
import ShowImage from "./ShowImage";
import  {Navigate}  from "react-router-dom";
import RecipeService from "../services/recipe.service";
import IngredientService from "../services/ingredient.service";
import AuthService from "../services/auth.service";

export default class AddRecipe extends React.Component{
    
    constructor(){
        super();
        this.state={
            currentUser:null,
            redirect:null,

            showIngredientForm:false,
            buttonDisabled:false,
            navigateToList:false,

            categories_id:[],
            ingredients:[],
            ingredients_details:[],
            difficulty_id:1,
            recipe_name:"",
            preparation: "",
            prep_time:0,
            for_Vegans:false,
            portions:0,
            image_id:0,

            categories_error:"",
            name_error:"",
            prep_time_error:"",
            preparation_error:"",
            portions_error:"",
            difficulty_error:"",
            ingredients_error:"",
            image_error:"",
            error_message:"",

            error401:false,


            
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOnChangeCategories = this.handleOnChangeCategories.bind(this);
         this.showAddIngredientForm = this.showAddIngredientForm.bind(this);
         this.cancelAddIngredient=this.cancelAddIngredient.bind(this);
         this.setNewIngredientId=this.setNewIngredientId.bind(this);
         this.updateIngredients=this.updateIngredients.bind(this);
         this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
         this.onIngredientUpdate = this.onIngredientUpdate.bind(this);
         this.handleOnChangeDifficulty = this.handleOnChangeDifficulty.bind(this);
         this.setFileId=this.setFileId.bind(this);
         this.handleForVegansChange=this.handleForVegansChange.bind(this);
         this.handleCancelAddRecipe = this.handleCancelAddRecipe.bind(this);

    }
    componentDidMount(){
        const currentUser = AuthService.getCurrentUser();
        
        //console.log(currentUser);
        if(currentUser===null) this.setState({redirect:"/"})
        if(currentUser!==null&&!currentUser.roles.includes("ROLE_ADMIN"))this.setState({redirect:"/"});


        
        
         this.updateIngredients();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const current = new Date();
        let recipe={
            id:0,
            dateAdded:current,
            forVegans:this.state.for_Vegans,
            name:this.state.recipe_name,
            portions:parseInt(this.state.portions),
            preparation:this.state.preparation,
            preparationTime:parseInt(this.state.prep_time),
            ingredients:[],
            categories:[],
            difficulty:{id:this.state.difficulty_id, level:""},

            photo:{
                id:this.state.image_id,
                photoName:"s",
                photoContent:[]
            }
            
        }
        if(this.state.image_id===0)recipe.photo=null;
        this.state.ingredients.forEach(el=> {
            recipe.ingredients.push({
                id:el,
                name:"s",
                amount:0,
                unit:{
                    id: 0,
                    name: "s"
                }
            });
        });

        this.state.categories_id.forEach(el=> {
            recipe.categories.push(
                {
                    id: el,
                    name: "s"
                }
            );
        });
        //console.log(recipe);

        const response = await RecipeService.createRecipe(recipe)//await fetch('/recipe/create',{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(recipe)});
           // console.log(response)
        if(response.status===406){
                const body = await response.data;
                if(body.fieldErrors){
                    body.fieldErrors.forEach(fieldError => {
                        if(fieldError.field === 'name'){
                            this.setState({name_error:fieldError.message})
                        }
                        if(fieldError.field === 'preparation'){
                        this.setState({preparation_error:fieldError.message})
                        }
                        if(fieldError.field === 'preparationTime'){
                            this.setState({prep_time_error:fieldError.message})
                        }
                        if(fieldError.field === 'categories'){
                            this.setState({categories_error:fieldError.message})
                        }
                        if(fieldError.field === 'ingredients'){
                            this.setState({ingredients_error:fieldError.message})
                        }
                        if(fieldError.field === 'difficulty'){
                            this.setState({difficulty_error:fieldError.message})
                        }
                        if(fieldError.field === 'portions'){
                            this.setState({portions_error:fieldError.message})
                        }
                        if(fieldError.field ==='photo'){
                            this.setState({image_error:fieldError.message})
                        }
                    
                    });
            }}
            if(response.status===401){
                this.setState({error401:true});
            }
            if ( response.status ===200 ) {
                const body = await response.data;
                this.setState({navigateToList: true});
                console.log(body);
            }
      

    }
    handleOnChangeCategories(e){
        let newArray = this.state.categories_id.slice();
        if(newArray.includes(parseInt(e.target.value))) {newArray=newArray.filter((item) => item !== parseInt(e.target.value));}
        else{newArray.push(parseInt(e.target.value));}
        this.setState({categories_id:newArray})
        
    }
    showAddIngredientForm(){
        this.setState({showIngredientForm:true, buttonDisabled:true});
    }
    cancelAddIngredient(){
        this.setState({showIngredientForm:false, buttonDisabled:false});
    }
    async setNewIngredientId(newid){
        console.log(newid);
        let newIng = this.state.ingredients.slice();
        newIng.push(newid);



        const response =await IngredientService.getIngredientList(newIng);//await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(newIng)});
        const body =await  response.data;  
        console.log(body);


        this.setState({ingredients:newIng,ingredients_details:body});
        this.cancelAddIngredient();
        
    }
    async updateIngredients(){
       const currentUser = AuthService.getCurrentUser();
        const response = await IngredientService.getIngredientList(this.state.ingredients)//event.target.value //await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(this.state.ingredients)});
        const body =await  response.data;  
        console.log(body);
        this.setState({ingredients_details: body,currentUser: currentUser});
      }
   async handleIngredientDelete(event){
        if(!window.confirm("Czy napewno chcesz usun???? ten sk??adnik?"))return;
        const response =await IngredientService.deleteIngredient(event.target.value); //await fetch('/ingredient/'+event.target.value,{method: "DELETE"});
        //console.log(response)

        let newArray = this.state.ingredients.slice();
        newArray=newArray.filter((item) => item !== parseInt(event.target.value));

        
        
        const response2 =await  IngredientService.getIngredientList(newArray);//await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(this.state.ingredients)});
        const body =await  response2.data;  
        console.log(body);
        this.setState({ingredients:newArray, ingredients_details:body})

    }
    onIngredientUpdate(updatedIngredient){
        let newIng = this.state.ingredients_details.slice();
        this.setState({
            ingredients_details: newIng.map(el => {if(el.id===updatedIngredient.id)return updatedIngredient;
            return el;})
        });
       
        
    }
    handleForVegansChange(event){
        console.log(event.target.checked);
        this.setState({for_Vegans:event.target.checked});
    }
    handleOnChangeDifficulty(event){
        console.log(event.target.value)
        this.setState({difficulty_id:parseInt(event.target.value)});
    }
    async setFileId(id)
    {
        this.setState({image_id:id});
    }

    handleCancelAddRecipe(e){
        this.setState({navigateToList:true});
    }

    render() {
        if(this.state.redirect)return <Navigate to={this.state.redirect}/>
        console.log(this.state.currentUser)
    
        return (
            <div>
                {this.state.navigateToList && <Navigate to="/recipelist" />}
                {this.state.error401 && <Navigate to="/error401" />}

                <h1 className="jumbotron">Dodaj przepis</h1>
                <div>
                    <label><b>Sk??adniki:</b></label>
                    {this.state.ingredients_details.length > 0 ?
                        <ShowIngredients ingredients={this.state.ingredients_details}
                            onDelete={this.handleIngredientDelete}
                            onUpdate={this.onIngredientUpdate}>

                        </ShowIngredients>
                        : <p>Brak sk??adnik??w</p>}
                    <button className="btn btn-primary" onClick={this.showAddIngredientForm} disabled={this.state.buttonDisabled}>Dodaj sk??adnik</button>
                    {this.state.showIngredientForm &&
                        <div>
                            <AddIngredient
                                setNewIngredientId={this.setNewIngredientId}>

                            </AddIngredient>
                            <button className="btn btn-primary" onClick={this.cancelAddIngredient}>Anuluj</button>
                        </div>}
                    <br />
                    <span style={{ color: 'red' }}> {this.state.ingredients_error}</span>
                </div>

                <div>
                    <label><b>Zdj??cie</b></label>
                    {this.state.image_id === 0 &&
                        <UploadFile setFileId={this.setFileId}></UploadFile>}
                    {this.state.image_id !== 0 &&
                        <ShowImage imageId={this.state.image_id} setFileId={this.setFileId}></ShowImage>}
                </div>
                <form onSubmit={this.handleSubmit}>

                    <Categories value={this.state.categories_id}
                        onChangeValue={this.handleOnChangeCategories}></Categories>
                    <span style={{ color: 'red' }}> {this.state.categories_error} </span>

                    <DifficultyLevels value={this.state.difficulty_id}
                        onChangeValue={this.handleOnChangeDifficulty}></DifficultyLevels>
                    <br />
                    <span style={{ color: 'red' }}> {this.state.difficulty_error} </span>

                    <div className="form-row">
                        <div className="col">
                            <label><b>Nazwa:</b></label>
                            <input className="form-control" type="text" value={this.state.recipe_name} onChange={(e) => this.setState({ recipe_name: e.target.value })} />
                            <span style={{ color: 'red' }}> {this.state.name_error} </span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label><b>Przygotowanie</b></label>
                            <textarea className="form-control"  rows="10" width="auto" height="auto" value={this.state.preparation} onChange={(e) => this.setState({ preparation: e.target.value })}></textarea>
                            <br />
                            <span style={{ color: 'red' }}> {this.state.preparation_error} </span>

                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label><b>Czas przygotowania (min)</b></label>
                            <input className="form-control" type="number" min="1" value={this.state.prep_time} onChange={(e) => this.setState({ prep_time: e.target.value })} />
                            <br />
                            <span style={{ color: 'red' }}> {this.state.prep_time_error} </span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label><b>Ilo???? porcji</b></label>
                            <input className="form-control" type="number" min="1" value={this.state.portions} onChange={(e) => this.setState({ portions: e.target.value })} />
                            <br />
                            <span style={{ color: 'red' }}> {this.state.portions_error} </span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label><b>Odpowiedni dla vegan:</b> <input type="checkbox" checked={this.state.for_Vegans} onChange={this.handleForVegansChange} /></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                        <input className="btn btn-primary" type="submit" value="Dodaj" /><br />
                    </div>
                </div>
            </form>
            <br/>
            <button className="btn btn-primary" onClick={this.handleCancelAddRecipe}>Anuluj</button>
        </div>
    );
            
    }
}
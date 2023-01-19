
import React from "react";
import Categories from "./Categories";
import AddIngredient from "./AddIngredient";
import ShowIngredients from "./ShowIngredients";
import DifficultyLevels from "./DifficultyLevels";
import UploadFile from "./UploadFile";
import ShowImage from "./ShowImage";
import  {Navigate}  from "react-router-dom";
import withRouter from './withRouter';

 class EditRecipe extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            showIngredientForm:false,
            buttonDisabled:false,
            navigateToDetails:false,
            error404:false,
            error500:false,

            id:this.props.params.id,
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
            dateAdded:"",

            categories_error:"",
            name_error:"",
            prep_time_error:"",
            preparation_error:"",
            portions_error:"",
            difficulty_error:"",
            ingredients_error:"",
            image_error:"",
            error_message:"",


            
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

    }
    async componentDidMount(){

        const response = await fetch('/recipe/get/'+this.state.id,{method:"GET"});
        if ( response.ok ) {
            const body = await response.json();
            let categories = [];
            body.categories.forEach((cat)=>{categories.push(cat.id)})

            let ingr = [];
            body.ingredients.forEach((ing)=>{ingr.push(ing.id)})
            let image = 0;
           if(body.photo) image = body.photo.id;
            this.setState({dateAdded:body.dateAdded,categories_id:categories,ingredients:ingr,difficulty_id:body.difficulty.id,recipe_name:body.name,preparation:body.preparation,prep_time:body.preparationTime,for_Vegans:body.forVegans,portions:body.portions,image_id:image});
            
            console.log(body);
        }
        if ( response.status===404 ) {
            this.setState({error404:true});
        }
        this.updateIngredients();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const current = new Date();
        let recipe={
            id:this.state.id,
            dateAdded:this.state.dateAdded,
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
        this.state.ingredients_details.forEach(el=> {
            recipe.ingredients.push(el);
        });

        this.state.categories_id.forEach(el=> {
            recipe.categories.push(
                {
                    id: el,
                    name: "s"
                }
            );
        });
        console.log(recipe);
        const response = await fetch('/recipe/update',{method:"PUT",headers:{"Content-Type":"application/json"}, body:JSON.stringify(recipe)});
            if(response.status===406){
                const body = await response.json();
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
            if ( response.ok ) {
                //const body = await response.json();
                this.setState({navigateToDetails: true});
                //console.log(body);
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

        const response = await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(newIng)});
        const body =await  response.json();  
        console.log(body);


        this.setState({ingredients:newIng,ingredients_details:body});
        this.cancelAddIngredient();
        
    }
    async updateIngredients(){
        const response = await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(this.state.ingredients)});
        const body =await  response.json();  
        console.log(body);
        this.setState({ingredients_details: body});
      }
   async handleIngredientDelete(event){
        if(!window.confirm("Czy napewno chcesz usunąć ten składnik?"))return;
        const response = await fetch('/ingredient/'+event.target.value,{method: "DELETE"});
        console.log(response)

        let newArray = this.state.ingredients.slice();
        newArray=newArray.filter((item) => item !== parseInt(event.target.value));

        
        
        const response2 = await fetch('/ingredient/list',{method: "POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(this.state.ingredients)});
        const body =await  response2.json();  
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

    render() {
        console.log(this.state.ingredients_details)
    
        return (
            <div>
                {this.state.navigateToDetails&&<Navigate to={`/recipelist/details/${this.state.id}`}/>}
                {this.state.error404&&<Navigate to={`/error404`}/>}
                <h1>Edytuj przepis</h1>
                <div >
                    <h3>Składniki:</h3>
                        <ShowIngredients ingredients={this.state.ingredients_details} 
                        onDelete={this.handleIngredientDelete}
                        onUpdate={this.onIngredientUpdate}>

                        </ShowIngredients>

                    <button onClick={this.showAddIngredientForm}  disabled={this.state.buttonDisabled}>Dodaj składnik</button>
                    {this.state.showIngredientForm  &&
                        <div>
                            <AddIngredient
                                setNewIngredientId={this.setNewIngredientId}>

                                </AddIngredient>
                            <button onClick={this.cancelAddIngredient}>Anuluj</button>
                        </div>
                    }
                    <br/>
                    <span > {this.state.ingredients_error}</span>
                </div>

                <div>
                <label>
                    <h3>Zdjęcie:</h3>
                        {this.state.image_id===0&&
                            <UploadFile setFileId={this.setFileId}></UploadFile>}
                        {this.state.image_id!==0&&
                            <ShowImage imageId={this.state.image_id} setFileId={this.setFileId} ></ShowImage>
                        }
                       
                    
                </label>
                </div>
            <form onSubmit={this.handleSubmit} >
                
                <Categories value={this.state.categories_id}
                             onChangeValue={this.handleOnChangeCategories}></Categories>
                <span > {this.state.categories_error} </span>

                <DifficultyLevels value={this.state.difficulty_id}
                             onChangeValue={this.handleOnChangeDifficulty}></DifficultyLevels>
                <br/>
                <span > {this.state.difficulty_error} </span>
                <label>
                    <h3>Nazwa:</h3>   
                    <input type="text" value={this.state.recipe_name} onChange={(e) => this.setState({recipe_name: e.target.value})}/>
                    <br/>
                   <span > {this.state.name_error} </span>
                </label> 

                <label>
                    <h3>Przygotowanie:</h3>   
                    <textarea cols="50" rows="20" width="auto" height="auto" value={this.state.preparation} onChange={(e) => this.setState({preparation: e.target.value})}></textarea>
                    <br/>
                    <span > {this.state.preparation_error} </span>
                </label> 

                <label>
                    <h3>Czas przygotowania (minuty):</h3>   
                    <input type="number" min="1"  value={this.state.prep_time} onChange={(e) => this.setState({prep_time: e.target.value})}/>
                    <br/>
                    <span > {this.state.prep_time_error} </span>
                </label> 
                <label>
                    <h3>Ilość porcji:</h3>   
                    <input type="number" min="1"  value={this.state.portions} onChange={(e) => this.setState({portions: e.target.value})}/>
                    <br/>
                    <span > {this.state.portions_error} </span>
                </label>
                <label>
                    <h3>Odpowiedni dla vegan: <input type="checkbox"  checked={this.state.for_Vegans} onChange={this.handleForVegansChange}/></h3>   
                </label> 
                

                <input type="submit" value="Zapisz"/>
                <br/>
                <span > {this.state.error_message} </span>
            </form>
            
            </div>
            );
            
    }
}

export default withRouter(EditRecipe);
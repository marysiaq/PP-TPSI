
import React from "react";
import Categories from "./Categories";
import AddIngredient from "./AddIngredient";
import ShowIngredients from "./ShowIngredients";
import DifficultyLevels from "./DifficultyLevels";
export default class AddRecipe extends React.Component{
    constructor(){
        super();
        this.state={
            categories_id:[1,3],
            ingredients:[],
            showIngredientForm:false,
            buttonDisabled:false,
            ingredients_details:[],
            difficulty_id:2,
            recipe_name:"abcd",
            preparation:"wesadf adf a adfs ads as ads as d asd adsf ds sdfsdfadsfd asd fasdf sdf adsf sad asdf a fsd fs asd as d as sd ads a fds sa dsaf a",
            prep_time:0,
            for_Vegans:false,
            portions:1,

            categories_error:"",
            name_error:"",
            prep_time_error:"",
            preparation_error:"",
            portions_error:"",
            difficulty_error:"",
            ingredients_error:"",
            error_message:""
            
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
    }
    componentDidMount(){
        this.updateIngredients();
    }

    handleSubmit(event) {
        event.preventDefault();
        const current = new Date();
        //const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        //alert(date);
        let recipe={
            id:0,
            dateAdded:current,
            for_Vegans:this.state.for_Vegans,
            name:this.state.recipe_name,
            portions:parseInt(this.state.portions),
            preparation:this.state.preparation,
            preparationTime:parseInt(this.state.prep_time),
            ingredients:[],
            categories:[],
            difficulty:{id:this.state.difficulty_id, level:""}
        }
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
        console.log(recipe);
        fetch('/recipe/create',{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(recipe)})
            .then((response) =>
                response.json()
            )
            .then((data) => {
                if(data.fieldErrors){
                    data.fieldErrors.forEach(fieldError => {
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
                    
                    });
                }
                
           })
            .catch((err) => alert(err));
        


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
    handleOnChangeDifficulty(event){
        console.log(event.target.value)
        this.setState({difficulty_id:parseInt(event.target.value)});
    }


    render() {
    
        return (
            <div>
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
                    <h3>Czas przygotowania:</h3>   
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
                    <h3>Odpowiedni dla vegan: <input type="checkbox"  value={this.state.for_Vegans} onChange={(e) => this.setState({for_Vegans: e.target.value})}/></h3>   
                </label> 
                <div>
                <label>
                    <h3>Zdjęcie:<input value={this.state.file} onChange={(e) => this.setState({file: e.target.value})} type="file" accept="image/png, image/jpeg"/></h3>
                </label>
                </div>

                

                <input type="submit"/>
                <br/>
                <span > {this.state.error_message} </span>
            </form>
            
            </div>
            );
            
    }
}
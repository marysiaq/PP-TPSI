
import React from "react";
import Categories from "./Categories";
import AddIngredient from "./AddIngredient";
import ShowIngredients from "./ShowIngredients";
export default class AddRecipe extends React.Component{
    constructor(){
        super();
        this.state={
            categories_id:[1,3],
            ingredients:[1,2,39],
            showIngredientForm:false,
            buttonDisabled:false,
            ingredients_details:[]
            
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOnChangeCategories = this.handleOnChangeCategories.bind(this);
         this.showAddIngredientForm = this.showAddIngredientForm.bind(this);
         this.cancelAddIngredient=this.cancelAddIngredient.bind(this);
         this.setNewIngredientId=this.setNewIngredientId.bind(this);
         this.updateIngredients=this.updateIngredients.bind(this);
         this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
         this.onIngredientUpdate = this.onIngredientUpdate.bind(this);
    }
    componentDidMount(){
        this.updateIngredients();
    }

    handleSubmit(event) {
        alert(this.state.categories_id);
        event.preventDefault();
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
                </div>
            <form onSubmit={this.handleSubmit} >
                
                <Categories value={this.state.categories_id}
                             onChangeValue={this.handleOnChangeCategories}></Categories>
                <input type="submit"/>
            </form>
            
            </div>
            );
            
    }
}
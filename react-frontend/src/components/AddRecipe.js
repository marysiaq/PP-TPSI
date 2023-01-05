
import React from "react";
import Categories from "./Categories";
import AddIngredient from "./AddIngredient";
import ShowIngredients from "./ShowIngredients";
export default class AddRecipe extends React.Component{
    constructor(){
        super();
        this.state={
            categories_id:[1,3],
            ingredients:[1,2],
            showIngredientForm:false,
            buttonDisabled:false
            
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOnChangeCategories = this.handleOnChangeCategories.bind(this);
         this.showAddIngredientForm = this.showAddIngredientForm.bind(this);
         this.cancelAddIngredient=this.cancelAddIngredient.bind(this);
         this.setNewIngredientId=this.setNewIngredientId.bind(this);
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
    setNewIngredientId(newid){
        console.log(newid);
        let newIng = this.state.ingredients.slice();
        newIng.push(newid);
        this.setState({ingredients:newIng});
        this.cancelAddIngredient();
    }

    render() {
    
        return (
            <div>
                <div >
                    <h3>Składniki:</h3>
                    <ShowIngredients ingredients={this.state.ingredients}></ShowIngredients>

                    <button onClick={this.showAddIngredientForm}  disabled={this.state.buttonDisabled}>Dodaj składnik</button>
                    {this.state.showIngredientForm  &&
                        <div>
                            <AddIngredient
                                setNewIngredientId={this.setNewIngredientId}></AddIngredient>
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
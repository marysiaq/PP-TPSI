
import React from "react";
import Categories from "./Categories";
export default class AddRecipe extends React.Component{
    constructor(){
        super();
        this.state={
            categories_id:[1,2]

         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOnChangeCategories = this.handleOnChangeCategories.bind(this);
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

    render() {
    
        return (
            <form onSubmit={this.handleSubmit} >
                <Categories value={this.state.categories_id}
                             onChangeValue={this.handleOnChangeCategories}></Categories>
                <input type="submit"/>
            </form>
            
            );
            
    }
}
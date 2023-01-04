
import React from "react";
import Categories from "./Categories";
export default class AddRecipe extends React.Component{
    constructor(){
        super();
        this.state={
            categories_id:[]
         }
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert(this.state.categories_id);
        event.preventDefault();
        
        
    }

    render() {
    
        return (
            <form onSubmit={this.handleSubmit} >
                <Categories value={this.state.categories_id}
                             onChangeValue={(event) => this.setState({categories_id:event.target.value})}></Categories>
                <input type="submit"/>
            </form>
            
            );
            
    }
}
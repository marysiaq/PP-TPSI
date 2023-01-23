import React from "react";

import EditIngredient from "./EditIngredient";


export default class ShowIngredients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editKey:0
        }
        this.updateIngredients=this.updateIngredients.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.ingredients.length !== this.props.ingredients.length)
        {
            this.updateIngredients();
        }
    }
    updateIngredients(){
        this.setState({ingredients:this.props.ingredients})
        console.log("udpated");
    }
    handleEdit(event){
        console.log(event.target.value );
        console.log(parseInt(event.target.value) === 1)
       this.setState({editKey:parseInt(event.target.value)});
    }
    cancelEdit(event){
        this.setState({editKey:0});
    }
    

    render(){
        return(
            <ul>
                {
                    this.props.ingredients.map((ingredient) => (
                        <div key={ingredient.id}>
                            {this.state.editKey === ingredient.id? <li><EditIngredient name={ingredient.name}
                                                                                    amount={ingredient.amount}  
                                                                                    unit_id={ingredient.unit.id} 
                                                                                    unit_name={ingredient.unit.name}
                                                                                    id ={ingredient.id} 
                                                                                    onCancel={this.cancelEdit} 
                                                                                    onUpdate={this.props.onUpdate}></EditIngredient> </li>
                                                                    : <li >{ingredient.name} - {ingredient.amount} {ingredient.unit.name}   <button className="btn btn-primary" value={ingredient.id} onClick={this.props.onDelete}> Usuń </button> <button className="btn btn-primary" value={ingredient.id} onClick={this.handleEdit}>Edytuj</button></li>}
                        </div>
                    ))
                }
            </ul>
        );
    }

}
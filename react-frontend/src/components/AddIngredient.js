
import React from "react";
import Units from "./Units";
export default class AddIngredient extends React.Component{
    constructor(){
        super();
        this.state={
            amount: 0,
            name: "",
            unit_id:2
         }
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        //alert(this.state.unit_id+ " " + this.state.amount);
        event.preventDefault();
        const newIngredient={
            id:0,
            name:this.state.name,
            unit:{
                id:this.state.unit_id,
                name:""
            },
            amount:this.state.amount
        }
        fetch('/ingredient/create',{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(newIngredient)}).then(()=>{
            console.log("New ingredient added!")
        })
        
    }

    render() {
    
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                Nazwa:
                    <input type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </label>
                <label>
                Ilość:
                    <input type="number"
                        value={this.state.amount}
                        onChange={(e) => this.setState({amount: e.target.value})}/>
                </label>
                <label>
                Jednostka miary:
                    <Units value={this.state.unit_id}
                        onChangeValue={(event) => this.setState({unit_id:event.target.value})}></Units>
                </label>
                <input type="submit"/>
            </form>
            
            );
            
    }
}
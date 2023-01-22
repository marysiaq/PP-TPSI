
import React from "react";
import Units from "./Units";
import IngredientService from '../services/ingredient.service'
export default class AddIngredient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            amount: 0,
            name: "",
            unit_id:1,

            amount_error:"",
            name_error:"",
            unit_error:""
         }
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
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
        const response = await   IngredientService.createIngredient(newIngredient);
        if(response.status ===200){
            let data = response.data;
            if(data.id){
                this.props.setNewIngredientId(data.id)
                this.setState({unit_error:"",name_error:"",amount_error:""})
            }
        }
        if(response.status===406){
            let data = response.data;
            if(data.fieldErrors){
                data.fieldErrors.forEach(fieldError => {
                    if(fieldError.field === 'name'){
                        this.setState({name_error:fieldError.message})
                 }
                    if(fieldError.field === 'amount'){
                    this.setState({amount_error:fieldError.message})
                    }
                    if(fieldError.field === 'unit'){
                        this.setState({unit_error:fieldError.message})
                    }
                });
            }
        }
       /*fetch('/ingredient/create',{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(newIngredient)}).then(response => response.json())
       .then(data =>{
        if(data.fieldErrors){
            data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'name'){
                    this.setState({name_error:fieldError.message})
             }
                if(fieldError.field === 'amount'){
                this.setState({amount_error:fieldError.message})
                }
                if(fieldError.field === 'unit'){
                    this.setState({unit_error:fieldError.message})
                }
            });
        }
        if(data.id){
            this.props.setNewIngredientId(data.id)
            this.setState({unit_error:"",name_error:"",amount_error:""})
        }

        } );*/
       this.setState({name:"",unit_id:1,amount:0});
       
    }

    render() {
    
        return (
            
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>
                Nazwa:
                    <input type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                        
                </label>
                <span>{this.state.name_error}</span>
                <br/>
                </div>
                <div>
                <label>
                Ilość:
                    <input type="number"
                        value={this.state.amount}
                        onChange={(e) => this.setState({amount: e.target.value})}/>
                </label>
                <span>{this.state.amount_error}</span>
                <br/>
                </div>
                <div>
                <label>
                Jednostka miary:
                    <Units value={this.state.unit_id}
                        onChangeValue={(event) => this.setState({unit_id:event.target.value})}></Units>
                </label>
                <br/>
                <span>{this.state.unit_error}</span>
                </div>
                <input type="submit" value="Dodaj"/>
            </form>
            
            );
            
    }
}
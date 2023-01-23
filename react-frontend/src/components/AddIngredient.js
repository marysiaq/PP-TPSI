
import React from "react";
import Units from "./Units";
import IngredientService from '../services/ingredient.service'
import { Navigate, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export default class AddIngredient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            redirect:null,
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
        if(response.status===500){
           this.setState({redirect:"error500"});

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
        if(this.state.redirect) return (<Navigate to={this.state.redirect}/>);
    
        return (
            
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label><b>Nazwa:</b></label>
                     <input className="form-control"  type="text"
                         value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}/>
                        
                    <span style={{ color: 'red' }} >{this.state.name_error}</span>
                
                </div>
                <div className="col-md-4 mb-3">
                    <label><b>Ilość: </b></label>
                    <input className="form-control"  type="number"
                        value={this.state.amount}
                        onChange={(e) => this.setState({amount: e.target.value})}/>
                
                <span style={{ color: 'red' }}>{this.state.amount_error}</span>
                </div>
                
                
                <div className="col-md-4 mb-3">
                <label > <b>Jednostka miary:</b></label>
                    <Units value={this.state.unit_id}
                        onChangeValue={(event) => this.setState({unit_id:event.target.value})}></Units>
                
                <span style={{ color: 'red' }}>{this.state.unit_error}</span>
                </div>
               
                <div className="col-md-4 mb-3">
                <input className="btn btn-primary"  type="submit" value="Dodaj"/>
                </div>
                </div>
                
            </form>
            
            );
            
    }
}
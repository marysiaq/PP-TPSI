import React, { useState } from "react";
import IngredientService from '../services/ingredient.service'
import Units from "./Units";
export default function EditIngredient(props){
    const [name, setName] = useState(props.name);
    const [amount,setAmount] = useState(props.amount);
    const [unit_id,setUnit_id]= useState(props.unit_id);
    const [unit_name,setUnit_name]=useState(props.unit_name);

    const [name_error, setName_error] = useState("");
    const [amount_error,setAmount_error] = useState("");
    const [unit_error,setUnit_error]= useState("");
   

    const handleSubmit=async (event)=> {
        event.preventDefault();
        const updatedIngredient={
            id:props.id,
            name:name,
            unit:{
                id:unit_id,
                name:unit_name
            },
            amount:parseInt(amount)
        }
        console.log(updatedIngredient);
        const response = await IngredientService.updateIngredient(updatedIngredient);
        if(response.status ===200){
            let body =   response.data;

            setUnit_error("");
            setAmount_error("");
            setName_error("");

            props.onUpdate(updatedIngredient);
            props.onCancel();
        }
        if(response.status===406){
            let data =  response.data;
            if(data.fieldErrors){
                data.fieldErrors.forEach(fieldError => {
                    if(fieldError.field === 'name'){
                        setName_error(fieldError.message)
                 }
                    if(fieldError.field === 'amount'){
                        setAmount_error(fieldError.message)
                    }
                    if(fieldError.field === 'unit'){
                        setUnit_error(fieldError.message)
                    }
                });
            }

        }
      /* fetch('/ingredient/',{method:"PUT",headers:{"Content-Type":"application/json"}, body:JSON.stringify(updatedIngredient)}).then(response => response.json())
       .then(data =>{
        if(data.fieldErrors){
            data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'name'){
                    setName_error(fieldError.message)
             }
                if(fieldError.field === 'amount'){
                    setAmount_error(fieldError.message)
                }
                if(fieldError.field === 'unit'){
                    setUnit_error(fieldError.message)
                }
            });
        }
        else{
            setUnit_error("");
            setAmount_error("");
            setName_error("");

            props.onUpdate(updatedIngredient);
            props.onCancel();
        }
        

        } );*/
       
       
       
    }
    const handleOnChange=(event)=>{
        setUnit_id(event.target.value)
        setUnit_name(event.target.querySelector("#id"+event.target.value).innerHTML)
        console.log(event.target.querySelector("#id"+event.target.value).innerHTML);
    }
    return(
        <div>
            <div>
            <label>
                Nazwa:
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </label>
                <br/>
                <span>{name_error}</span>
                </div>
                <div>
                <label>
                Ilość:
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                </label>
                <br/>
                <span>{amount_error}</span>
                </div>
                <div>
                <label>
                Jednostka miary:
                    <Units value={unit_id} 
                        onChangeValue={handleOnChange}></Units>
                </label>
                <br/>
                <span>{unit_error}</span>
                </div>
        
            <button onClick={handleSubmit}>Zapisz</button>
            <button onClick={props.onCancel}>Anuluj</button>
        </div>
        
    );
}
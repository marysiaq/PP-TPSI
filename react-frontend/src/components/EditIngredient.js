import React, { useState } from "react";
import Units from "./Units";
export default function EditIngredient(props){
    const [name, setName] = useState(props.name);
    const [amount,setAmount] = useState(props.amount);
    const [unit_id,setUnit_id]= useState(props.unit_id);
    const [unit_name,setUnit_name]=useState(props.unit_name);
   

    const handleSubmit=(event)=> {
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
       fetch('/ingredient/',{method:"PUT",headers:{"Content-Type":"application/json"}, body:JSON.stringify(updatedIngredient)}).then(response => console.log(response))
       
       props.onUpdate(updatedIngredient);
       props.onCancel();
       
    }
    const handleOnChange=(event)=>{
        setUnit_id(event.target.value)
        setUnit_name(event.target.querySelector("#id"+event.target.value).innerHTML)
        console.log(event.target.querySelector("#id"+event.target.value).innerHTML);
    }
    return(
        <div>
        
            <label>
                Nazwa:
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                Ilość:
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                </label>
                <label>
                Jednostka miary:
                    <Units value={unit_id} 
                        onChangeValue={handleOnChange}></Units>
                </label>
        
            <button onClick={handleSubmit}>Zapisz</button>
            <button onClick={props.onCancel}>Anuluj</button>
        </div>
        
    );
}
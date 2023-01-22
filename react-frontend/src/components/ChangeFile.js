
import React, { useState } from "react";
import RecipeService from '../services/recipe.service'
export default function ChangeFile(props){
    const[id,setId] = useState(props.fileId);
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = (e) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch('recipe/updateFile/'+id,{
            method: 'put',
            body: formData
        }).then(res => res.json()) .then(data =>{
            //console.log(data)
            
            //if(data.id)props.setFileId(data.id);
            
        });
        props.onImageChanged(id);
        setSelectedFile(null);
        console.log("file updated");
        
        
        
    }

    return(
        <div className="container">
            
            <div className="row">
                
                <div className="col-md-6">
                    <div className="form-group files color">
                            <label>Zmień zdjęcie </label>
                            <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
                    </div>
                    <button onClick={onClickHandler}>Prześlij</button>
                </div>
            </div>
            
        </div>
    )
}
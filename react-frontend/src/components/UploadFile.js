
import React, { useState } from "react";
import RecipeService from "../services/recipe.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function UploadFile(props){
    const [selectedFile, setSelectedFile] = useState(null);
    const [message,setMessage] = useState();
    //const [fileId,setFileId] = useState(props.fileId);
    

    const onFileChangeHandler = (e) => {
            var fileName = document.getElementById("customFileLang").files[0].name;
            var nextSibling = e.target.nextElementSibling
            nextSibling.innerText = fileName
        
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = async (e) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response =await RecipeService.uploadFile(formData);
        if(response.status ===200){
            let data = response.data;
            console.log(data.id)
            if(data.id)props.setFileId(data.id);
            setMessage("");
        }
        if(response.status === 400){
            let data = response.data;
            setMessage("Nie wybrano pliku!");
        }

        //console.log(selectedFile);
        /*fetch('/recipe/uploadFile',{
            method: 'post',
            body: formData
        }).then(res => res.json()) .then(data =>{
            console.log(data.id)
            if(data.id)props.setFileId(data.id);
            
        });*/
        
    }

    return(
        <div >
            
                <div className="custom-file">
                         
                        <input type="file" className="custom-file-input" id="customFileLang" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                        <label className="custom-file-label">Wybierz plik</label>
                </div>
                <br/>
                <span style={{ color: 'red' }} >{message}</span>
                <br/>
                <button className="btn btn-primary" onClick={onClickHandler}>Prześlij</button>
        </div>
    )
}
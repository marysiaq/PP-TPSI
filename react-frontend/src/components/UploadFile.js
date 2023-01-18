
import React, { useState } from "react";
export default function UploadFile(props){
    const [selectedFile, setSelectedFile] = useState(null);
    //const [fileId,setFileId] = useState(props.fileId);

    const onFileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = (e) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        //console.log(selectedFile);
        fetch('recipe/uploadFile',{
            method: 'post',
            body: formData
        }).then(res => res.json()) .then(data =>{
            console.log(data.id)
            if(data.id)props.setFileId(data.id);
            
        });
        
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group files color">
                            <label>Prześlij zdjęcie </label>
                            <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
                    </div>
                    <button onClick={onClickHandler}>Prześlij</button>
                </div>
            </div>
        </div>
    )
}
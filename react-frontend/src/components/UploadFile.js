
import React, { useState } from "react";
export default function UploadFile(props){
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileId,setFileId] = useState(props.fileId);

    const onFileChangeHandler = (e) => {
        //e.preventDefault();
        setSelectedFile(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(e.target.files[0]);
        //fetch('recipe/uploadFile', {
            //method: 'post',
           // body: formData
        //}).then(res => {
           // if(res.ok) {
               // console.log(res.data);
                //alert("File uploaded successfully.")
            //}
        //});
    };

    const onClickHandler = (e) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(selectedFile);

        
    }

   
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
                    </div>
                    <button onClick={onClickHandler}>Prześlij</button>
                </div>
            </div>
        </div>
    )
      
}
import React, { useState,useEffect } from "react";
export default function ShowImage(props){
    const [id,setId] = useState(props.imageId);
    const [content,setContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch('/recipe/getFile/'+id,{method:"GET"});
            const body = await respone.json();
            console.log(body);
            setContent(body.photoContent);
        }
        fetchData();
    });

    const onClickHandler = async (e) => {

        const respone = await fetch('/recipe/deleteFile/'+id,{method:"DELETE"});
        const body = await respone.json();
        console.log(body);
        props.setFileId(0);
        //const formData = new FormData();
        //formData.append('file', selectedFile);
        //console.log(selectedFile);
        //fetch('recipe/deleteFile',{
          //  method: 'post',
           // body: formData
        //}).then(res => res.json()) .then(data =>{
          //  console.log(data.id)
           // if(data.ok)props.setFileId(0);
            
        //});
    }
    return(
        <div>
            <img width="350" alt="gotowe jedzonko" src={`data:image/jpeg;base64,${content}`}/>
            <br/>
            <button onClick={onClickHandler}>Usuń</button>
        </div>
    );
}
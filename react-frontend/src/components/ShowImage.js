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
    return(
        <img width="350" alt="gotowe jedzonko" src={`data:image/jpeg;base64,${content}`}/>
    );
}
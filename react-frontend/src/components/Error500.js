import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Error500(){
    return(<div className="jumbotron">
        <h1>500!</h1>
        <p>Błąd serwera!</p>
    </div>);
}
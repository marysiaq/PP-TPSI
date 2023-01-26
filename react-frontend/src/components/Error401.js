import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Error401(){
    return(<div className="jumbotron">
        <h1>401!</h1>
        <p>Nie masz praw dostępu dodanej strony!</p>
    </div>);
}
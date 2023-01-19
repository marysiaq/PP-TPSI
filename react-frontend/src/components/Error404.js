import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Error404(){
    return(<div>
        <h1>404!</h1>
        <p>Nie znaleziono!</p>
    </div>);
}
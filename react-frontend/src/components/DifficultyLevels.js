import React, { useState ,useEffect} from "react";

export default function DifficultyLevels(props){
    const [difficultyLevels,setDifficultyLevels] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch('/recipe/difficulty',{method:"GET"});
            const body = await respone.json();
            console.log(body);
            setDifficultyLevels(body);
        }
        fetchData();
    }, []);
    return(
        <>
        <h3>Poziom trudności: </h3>
        <select value={props.value} onChange={props.onChangeValue}>
            {
                difficultyLevels.map((level) => (
                    <option key={level.id} value={level.id}> {level.level} </option>
                ))
            }

        </select>
        </>
    );

}
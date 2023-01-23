import React, { useState ,useEffect} from "react";
import RecipeService from '../services/recipe.service'
export default function DifficultyLevels(props){
    const [difficultyLevels,setDifficultyLevels] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            const respone = await RecipeService.getDifficulty();//await fetch('/recipe/difficulty',{method:"GET"});
            const body = await respone.data;
            //console.log(body);
            setDifficultyLevels(body);
        }
        fetchData();
    }, []);
    return(
        <div>
        <label className="my-1 mr-2" ><b>Poziom trudności</b></label>
        <select className="custom-select my-1 mr-sm-2" value={props.value} onChange={props.onChangeValue}>
            <option disabled  value="0" > -- wybierz z listy -- </option>
            {
                difficultyLevels.map((level) => (
                    <option key={level.id} value={level.id}> {level.level} </option>
                ))
            }

        </select>
        </div>
    );

}
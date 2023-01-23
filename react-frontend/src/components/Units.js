
import React from "react";
import IngredientService from "../services/ingredient.service";
export default class Units extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        units: []
    };
    }
    
    async componentDidMount() {
        const response = await IngredientService.getUnits();//await fetch('/ingredient/units');
        const body = await response.data;
        this.setState({units: body});
      }
  
    render() {  
        return (
            <select className="custom-select my-1 mr-sm-2" value={this.props.value} onChange={this.props.onChangeValue} >
                {this.state.units.map(unit =>
                    <option id ={"id"+unit.id} key={unit.id} value={unit.id}  >{unit.name}</option>
              )}
            </select >
            );
    }
}


import React from "react";
export default class Units extends React.Component{
    state = {
        units: []
    };
    
    async componentDidMount() {
        const response = await fetch('/ingredient/units');
        const body = await response.json();
        this.setState({units: body});
      }
  
    render() {
        const {units} = this.state;
        return (
            <select>
                {units.map(unit =>
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
              )}
            </select >
            );
    }
}

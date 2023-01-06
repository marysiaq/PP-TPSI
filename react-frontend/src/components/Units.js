
import React from "react";
export default class Units extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        units: []
    };
    }
    
    async componentDidMount() {
        const response = await fetch('/ingredient/units');
        const body = await response.json();
        this.setState({units: body});
      }
  
    render() {  
        return (
            <select value={this.props.value} onChange={this.props.onChangeValue} >
                {this.state.units.map(unit =>
                    <option id ={"id"+unit.id} key={unit.id} value={unit.id}  >{unit.name}</option>
              )}
            </select >
            );
    }
}

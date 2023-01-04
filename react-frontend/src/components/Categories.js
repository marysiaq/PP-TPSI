import React  from "react"; 
export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categories: [],

      };
        this.handleChange=this.handleChange.bind(this)
      }
      async componentDidMount() {
        const response = await fetch('/recipe/categories');
        const body = await response.json();
        this.setState({categories: body});
      } 
      render() {  
        return (
            <div>
              {this.state.categories.map((category) => (
                  <label key={category.id}>
                    <input type="checkbox" checked={this.props.value.includes(category.id)} onChange={this.props.onChangeValue} value={category.id} /> 
                  {category.name}
              </label> 
              ))}
            </div >
            );
    }
}
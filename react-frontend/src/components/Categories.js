import React  from "react"; 
export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categories: [],

      };
    
      }
      async componentDidMount() {
        const response = await fetch('/recipe/categories');
        const body = await response.json();
        this.setState({categories: body});
      } 
      render() {  
        return (
            <div>
              <h3>Kategorie:</h3>
              {this.state.categories.map((category) => (
                  <div key={category.id}><label >
                  <input type="checkbox" checked={this.props.value.includes(category.id)} onChange={this.props.onChangeValue} value={category.id} />
                  {category.name}
                </label><br /></div>
              ))}
            </div >
            );
    }
}
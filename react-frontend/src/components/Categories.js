import React  from "react"; 
import RecipeService from '../services/recipe.service'
export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categories: [],

      };
    
      }
      async componentDidMount() {
        const response = await RecipeService.getCategories();//await fetch('/recipe/categories');
        console.log(response);
        const body = await response.data;
        console.log(body)
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
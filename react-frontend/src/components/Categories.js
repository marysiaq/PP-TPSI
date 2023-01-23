import React  from "react"; 
import RecipeService from '../services/recipe.service'
import "bootstrap/dist/css/bootstrap.min.css";
export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categories: [],

      };
    
      }
      async componentDidMount() {
        const response = await RecipeService.getCategories();//await fetch('/recipe/categories');
       // console.log(response);
        const body = await response.data;
       // console.log(body)
        this.setState({categories: body});
      } 
      render() {  
        return (
            <div>
              <label><b>Kategorie:</b></label>
              <div >
              {this.state.categories.map((category) => (
                  <div className="form-check form-check-inline" key={category.id}><label className="form-check-label">
                  <input className="form-check-input" type="checkbox" checked={this.props.value.includes(category.id)} onChange={this.props.onChangeValue} value={category.id} />
                  {category.name}
                </label><br /></div>
              ))}
              </div>
            </div >
            );
    }
}
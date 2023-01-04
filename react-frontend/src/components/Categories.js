import React  from "react"; 
export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          categories: []
      };
      }
      async componentDidMount() {
        const response = await fetch('/recipe/categories');
        const body = await response.json();
        this.setState({categories: body,checkedState:new Array(body.length).fill(false)});

      }

      handleOnChange(position) {
        
      }

      render() {  
        return (
            <div>
                {this.state.categories.map(category =>
                <label key={category.id}>   
                    <input type="checkbox"  value={category.id} 
                           />
                    {category.name}
                </label> 
              )}
            </div >
            );
    }
}
import React from "react";
export default class ShowIngredients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingredients:[]
        }
    }
    async componentDidMount() {
        let ing_list=[];
        this.props.ingredients.forEach(async id => {
            const response = await fetch('/ingredient/'+id);
            const body = await response.json();
            ing_list.push(body);
        });
        console.log(ing_list);
        this.setState({ingredients: ing_list});
      }

    render(){
        return(
            <div>
                

            </div>
        );
    }

}
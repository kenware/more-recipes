import React, {PropTypes} from 'react';



const RecipeList = ({recipes}) => {
  return (
      <ul className="list-group">
        {recipes.map(recipe => 
           <li className="list-group-item" key={recipe.id}>{recipe.title}</li>
        )}
      </ul>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

class Home extends Component {
  componentDidMount() {
    this.props.actions.loadRecipes();
   }
  
  render() {
    const recipes = this.props.recipes;
    return (
      
      <div>
       <Header.nav />
       <div className="col-md-8">
       <ul className="list-group">
       {recipes.map(recipe => 
          <li className="list-group-item" key={recipe.id}>{recipe.title}</li>
       )}
     </ul>
        );};

      </div>
      
       <Header.footer />
      </div>
    );
  }
};

Home.propTypes = {
  recipes: PropTypes.array.isRequired
};
function mapStateToProps(state, ownProps) {  
  
      recipes: state.recipes

};
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
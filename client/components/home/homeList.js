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

class recipeApi {  
    static getAllRecipes() {
      return fetch('http://localhost:5000/api/recipes').then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
}
   export default recipeApi; 
import recipe from './model';
class controller{
   constructor(recipe){
       this.recipe = recipe;
   }
   getRecipe(req,res){
    //this.recipe.push(req.body);
    return recipe;
   }
addRecipe(req,res){
 this.recipe.push(req.body);
 return res.body;
}
 }
 export default controller;
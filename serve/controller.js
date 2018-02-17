import recipe from './model';
class controller{
   constructor(recipe){
       this.recipe = recipe;
   }
   getRecipe(req,res){
    //this.recipe.push(req.body);
    return res.json(recipe);
   }
addRecipe(req,res){
 recipe.push(req.body);
 return res.json(recipe);
}
 }
 export default controller;
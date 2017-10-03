import rec from "../models/models";
let reviews = rec.reviews;
let recipes = rec.contents;
export default class recipe{
  constructor(recipes,reviews){
    this.recipes=recipes;
    this.reviews=reviews;
  }
 listRecipe(req,res){
  return res.json({
    recipes:recipes,
    error:false
  });
 }
addRecipe(req,res){
  let data = req.body;
  recipes.push(data)
  return res.json({
    message: "sucess",
    error:false,
    recipe:data
  });
 }
 updaterecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
          recipes[i].name = req.body.name;
          recipes[i].description = req.body.description;
          return res.json({
          message: "sucess",
          error: false
          });
        }else{
           return res.json({
           message: "fail",
           error: true
           });
        }
   }
 }
 getRecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
        return res.json({
          recipes: recipes[i],
          error: false
        });

       }
   }

  }
  deleteRecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
        recipes.splice(i,1)
        return res.json({
          message: "sucess",
          error: false
        });

       }
   }

  }
  reviewRecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
        if (reviews[i].id === parseInt(req.params.recipesid,10)){
            reviews.push(req.body);
            return res.json({
            reviewed: reviews,
            recipe : recipes[i],
            error: false
           });
          }
       }
   }

  }
  upvoteRecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
          recipes[i].upvote++;
          return res.json({
          message: "sucess",
          recipes : recipes[i],
          error: false
          });
        }else{
           return res.json({
           message: "fail",
           error: true
           });
        }
   }
  }
  downvoteRecipe(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
          recipes[i].downvote ++;
          return res.json({
          message: "sucess",
          recipes : recipes[i],
          error: false,
          });
        }else{
           return res.json({
           message: "fail",
           error: true
           });
        }
   }
 }
  getReview(req,res){
   for (let i=0; i < recipes.length; i++){
       if (recipes[i].id === parseInt(req.params.recipesid,10)){
         if (reviews[i].id === parseInt(req.params.recipesid,10)){
           return res.json({
           recipes: recipes[i],
           reviews: reviews[i],
           error: false
           });
         }
       }
   }

  }
}

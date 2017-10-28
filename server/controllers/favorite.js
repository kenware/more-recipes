import model from '../models';

const  favorite = model.favorite;
const  recipesDetail = model.recipesDetail;

  const createfavorite = (req, res) => {
    return recipesDetail
    .findOne({
        where: {
          id: req.params.favorite
        }
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).send({
          message: 'recepes Not Found'
          });
      }
      return favorite
       .create({
         title: recipesDetail.title,
         content:     recipesDetail.content,
         ingredients: recipesDetail.ingredients,
         category :   recipesDetail.category,
         UserId :     req.decoded.id,
         upvote:      recipesDetail.upvote,
          downvote:   recipesDetail.downvote,
       })
      .then(favorite => res.status(201).send(favorite))
      .catch(error => res.status(400).send(error));
    });
};


export default {
  createfavorite
}
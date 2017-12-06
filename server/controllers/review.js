import model from '../models';
const recipesDetail = model.recipesDetail;
const  recipeReview = model.recipeReview;

const reviewR = (req, res) => {
  return recipesDetail
    .find({
        where: {
          id: req.params.recipesId
        }
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).send({
          message: 'recipes Not Found'
        });
      }

      return recipeReview
        .create({
        recipesDetailId : req.params.recipesId,
        reviews: req.body.reviews,
        title: req.body.title,
        reviewedBy: req.decoded.username
      })
      .then(recipeReview => res.status(201).json(recipeReview))
        .catch(error => res.status(407).send(error));
    })
    .catch(error => res.status(405).send(error));
}
const getReview = (req, res) => {
  return recipesDetail
    .find({
        where: {
          id: req.params.recipesId
        }
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).send({
          message: 'recipes Not Found'
        });
      }

      return recipeReview
        .findAll({
          where:{
        recipesDetailId : req.params.recipesId
          }
      })
      .then(reviews => res.status(201).json(reviews))
        .catch(error => res.status(407).send(error));
    })
    .catch(error => res.status(405).send(error));
}

export default {
  reviewR,
  getReview
}
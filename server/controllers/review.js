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
          message: 'recepes Not Found'
        });
      }

      return recipeReview
        .create({
        recipesDetailId : req.body.recipesId,
        reviews: req.body.reviews
      })
      .then(recipeReview => res.status(201).send(recipeReview))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}

export default {
  reviewR
}
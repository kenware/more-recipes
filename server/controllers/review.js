import model from '../models';
const  review = model.review;
const  recipesDetail = model.recipesDetail;

const reviewRecipes = (req, res) => {
  return recipesDetail
    .findOne({
        where: {
          id: req.params.recipesId
        },
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).send({
          message: 'recepes Not Found'
        });
      }

      return review
        .create({
        review: req.body.review,
      })
      .then(user => res.status(201).send(review))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}
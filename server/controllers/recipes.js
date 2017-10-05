import model from '../models';
const  recipesDetail = model.recipesDetail;

  const createrecipe = (req, res) => {

      return recipesDetail
       .create({
         tittle:      req.body.tittle,
         content:     req.body.content,
         ingredients: req.body.ingredients,
         category :   req.body.category,
         UserId :     req.decoded.id
       })
      .then(recipesDetail => res.status(201).send(recipesDetail))
      .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  return recipesDetail
    .findOne({
        where: {
          id: req.decoded.id,
          id: req.params.recipesId
        },
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).send({
          message: 'recepes Not Found'
        });
      }

      return recipesDetail
        .update({
          tittle : req.body.tittle ,
          content: req.body.content,
          ingredients: req.body.ingredients
        })
        .then(recipesDetail => res.status(200).send(recipesDetail))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}

export default {
  createrecipe,
  update

}
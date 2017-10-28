import model from '../models';

const  recipesDetail = model.recipesDetail;

  const createrecipe = (req, res) => {
      return recipesDetail
       .create({
         title: req.body.title,
         content:     req.body.content,
         ingredients: req.body.ingredients,
         category :   req.body.category,
         UserId :     req.decoded.id,
         upvote:0,
         downvote:0,
       })
      .then(recipesDetail => res.status(201).send(recipesDetail))
      .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  return recipesDetail
    .findOne({
        where: {
          UserId: req.decoded.id,
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
          title : req.body.title ,
          content: req.body.content,
          ingredients: req.body.ingredients,
          category :   req.body.category,
        })
        .then(recipesDetail => res.status(200).send(recipesDetail))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}

const upvote = (req, res) => {
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

      return recipesDetail
        .update({
          upvote:recipesDetail.upvote+1
        })
        .then(recipesDetail => res.status(200).send(recipesDetail))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}

const downvote = (req, res) => {
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

      return recipesDetail
        .update({
          downvote:recipesDetail.downvote+1
        })
        .then(recipesDetail => res.status(200).send(recipesDetail))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(405).send(error));
}

const destroy = (req, res) => {
  recipesDetail
    .findOne({
        where: {
          UserId: req.decoded.id,
          id: req.params.recipesId
        }
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(400).send({
          message: 'you can only delete recipes you added'
        });
      }
      return recipesDetail
        .destroy()
        .then(() => res.status(200).send({message:"recipes deleted"}))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

const list = (req, res) => {
  return recipesDetail
    .all()
    .then(recipesDetail => res.status(200).send(recipesDetail))
    .catch(error => res.status(400).send({message:"no recipes in in the list",error:error}));
}
const sortBy = (req, res) => {
  let sort = req.query.sort;
  let orders = req.query.order;

  return recipesDetail
    .all({
      order:[
      [`${sort}`,`${orders}`]
      ]
    })
    .then(recipesDetail => {

      res.status(200).send(recipesDetail)
    })
    .catch(error => res.status(400).send({message:"no recipes in the list",error:error}));
}

export default {
  createrecipe,
  update,
  destroy,
  list,
  upvote,
  downvote,
  sortBy
}
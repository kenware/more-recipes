import model from '../models';
import Sequelize from 'sequelize'
const  recipesDetail = model.recipesDetail;
const Op = Sequelize.Op;
  const createrecipe = (req, res) => {
    let filename;
    if(req.files.length!==0){
       filename = req.files[0].filename;
       
    }else{
       filename = "g.jpg";
       
    }
      
      return recipesDetail
      .create({
        title: req.body.title,
        content:     req.body.content,
        ingredients: req.body.ingredients,
        UserId :     req.decoded.id,
        image: filename,
        upvote:0,
        downvote:0,
      })
     .then(recipesDetail =>{
      
       res.status(201).json(recipesDetail)
     })
     .catch(error => res.status(400).json(error));
   
      res.end();
      
};

const update = (req, res) => {
  let filename;
  return recipesDetail
    .findOne({
        where: {
          UserId: req.decoded.id,
          id: req.params.recipesId
        },
      })
    .then(recipesDetail => {
      if (!recipesDetail) {
        return res.status(404).json('recepes Not Found');
      }
      
      if(req.files.length!==0){
         filename = req.files[0].filename;
         
      }else{
         filename = req.body.filename;
         
      }
      return recipesDetail
        .update({
          title : req.body.title ,
          content: req.body.content,
          ingredients: req.body.ingredients,
          image:filename
         
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
        return res.status(404).json('recepes Not Found');
      }
      if(recipesDetail.UserId==req.decoded.id){
        return res.status(405).json('You cant upvote recipe you added');
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
        return res.status(404).json('recepes Not Found');
      }
      if(recipesDetail.UserId==req.decoded.id){
        return res.status(405).json('You cant downvote recipe you added');
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

const getOneRecipe = (req, res) => {
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

      return res.status(200).json(recipesDetail);
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
        return res.status(400).json('you can only delete recipes you added');
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

const userList = (req, res) => {
  return recipesDetail
    .findAll({
      where: {
        UserId: req.decoded.id
      },
      order:[
        [`id`,`DESC`]
        ]
    })
    .then(recipesDetail => res.status(200).json(recipesDetail))
    .catch(error => res.status(400).json("no recipes in in the list"));
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

      res.status(200).json(recipesDetail)
    })
    .catch(error => res.status(400).send({message:"no recipes in the list",error:error}));
}

const search = (req, res) => {
  return recipesDetail
    .findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%'+req.query.keyword+'%'
            }
          },
          {
            content: {
              [Op.like]: '%'+req.query.keyword+'%'
            }
          },
          {
            ingredients: {
              [Op.like]: '%'+req.query.keyword+'%'
            }
          }
        ]
      },
      order:[
        [`id`,`DESC`]
        ]
    })
    .then(recipesDetail => res.status(200).json(recipesDetail))
    .catch(error => res.status(400).json("no recipes in in the list"));
}


export default {
  createrecipe,
  update,
  destroy,
  list,
  upvote,
  downvote,
  sortBy,
  getOneRecipe,
  userList,
  search
}
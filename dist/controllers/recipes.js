"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require("../models/models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reviews = _models2.default.reviews;
var recipes = _models2.default.contents;

var recipe = function () {
  function recipe(recipes, reviews) {
    _classCallCheck(this, recipe);

    this.recipes = recipes;
    this.reviews = reviews;
  }

  _createClass(recipe, [{
    key: "listRecipe",
    value: function listRecipe(req, res) {
      return res.json({
        recipes: recipes,
        error: false
      });
    }
  }, {
    key: "addRecipe",
    value: function addRecipe(req, res) {
      var data = req.body;
      recipes.push(data);
      return res.json({
        message: "sucess",
        error: false,
        recipe: data
      });
    }
  }, {
    key: "updaterecipe",
    value: function updaterecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          recipes[i].name = req.body.name;
          recipes[i].description = req.body.description;
          return res.json({
            message: "sucess",
            error: false
          });
        } else {
          return res.json({
            message: "fail",
            error: true
          });
        }
      }
    }
  }, {
    key: "getRecipe",
    value: function getRecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          return res.json({
            recipes: recipes[i],
            error: false
          });
        }
      }
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          recipes.splice(i, 1);
          return res.json({
            message: "sucess",
            error: false
          });
        }
      }
    }
  }, {
    key: "reviewRecipe",
    value: function reviewRecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          if (reviews[i].id === parseInt(req.params.recipesid, 10)) {
            reviews.push(req.body);
            return res.json({
              reviewed: reviews,
              recipe: recipes[i],
              error: false
            });
          }
        }
      }
    }
  }, {
    key: "upvoteRecipe",
    value: function upvoteRecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          recipes[i].upvote++;
          return res.json({
            message: "sucess",
            recipes: recipes[i],
            error: false
          });
        } else {
          return res.json({
            message: "fail",
            error: true
          });
        }
      }
    }
  }, {
    key: "downvoteRecipe",
    value: function downvoteRecipe(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          recipes[i].downvote++;
          return res.json({
            message: "sucess",
            recipes: recipes[i],
            error: false
          });
        } else {
          return res.json({
            message: "fail",
            error: true
          });
        }
      }
    }
  }, {
    key: "getReview",
    value: function getReview(req, res) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(req.params.recipesid, 10)) {
          if (reviews[i].id === parseInt(req.params.recipesid, 10)) {
            return res.json({
              recipes: recipes[i],
              reviews: reviews[i],
              error: false
            });
          }
        }
      }
    }
  }]);

  return recipe;
}();

exports.default = recipe;
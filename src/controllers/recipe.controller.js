const recipeModel = require("../models/recipe.model");
const { success,failed }= require('../helpers/response');
const recipeController = {
  list: async(req, res) => {
    try {
      const str = ''
      const search = req.query.search ? req.query.search : str;
      const {page, limit} = req.query
      const pageValue = page? Number(page): 1
      const limitValue = limit? Number(limit): 6
      const offset = (pageValue - 1)*limitValue
      const allData = await recipeModel.allData()
      const totalData = Number(allData.rows[0].total)
      recipeModel
        .listAll(search,limitValue,offset)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData/limitValue)
          }
          if(result.rowCount == 0){
            return failed(res, 'failed to get data', "failed", "data not found")
          }
          success(res, result.rows, "success", "success to get data",pagination)
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get data")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get data")
    }
  },
  detail: (req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }
      recipeModel
        .detailRecipe(check)
        .then((result) => {
          if(result.rowCount == 0){
            return failed(res, 'failed to get data', "failed", "data not found")
          }
          success(res, result.rows[0], "success", "success to get detail")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get detail")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get detail")
    }
  },
  input: async(req, res) => {
    try {
      const body = req.body;
      const { id, photo, title, ingredients, video, date, idUser } = body;
      if (!id || !title || !ingredients || !video || !date || !idUser) {
        throw Error("parameter cannot blank");
      }else if(req.APP_DATA.tokenDecode.id != idUser){
        return failed(res, 'forbidden access', "failed", "failed to input recipe")
      }
      recipeModel
        .inputRecipe(id, photo, title, ingredients, video, date, idUser)
        .then((result) => {
          success(res, result.command, "success", "success to input recipe")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to input recipe")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to input recipe")
    }
  },
  update: async(req, res) => {
    try {
      const id = req.params.id;
      const { photo, title, ingredients, video, date, idUser } = req.body;
      const check = parseInt(id);
      const getData = await recipeModel.detailRecipe(id)
      const checkId = getData.rows[0].user_id
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      } else if (!title || !ingredients || !video || !date || !idUser) {
        throw Error("parameter cannot blank");
      }else if(req.APP_DATA.tokenDecode.id != idUser || idUser != checkId){
        return failed(res, 'forbidden access', "failed", "failed to update recipe")
      }
      recipeModel
        .updateRecipe(id, photo, title, ingredients, video, date, idUser)
        .then((result) => {
          success(res, result.command, "success", "success to update recipe")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to update recipe")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to update recipe")
    }
  },
  deleted: async(req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      const getData = await recipeModel.detailRecipe(id)
      const checkId = getData.rows[0].user_id
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if(req.APP_DATA.tokenDecode.id != checkId){
        return failed(res, 'forbidden access', "failed", "failed to input recipe")
      }
      recipeModel
        .deleteRecipe(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete recipe")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete recipe")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete recipe")
    }
  },
  news: (req, res) => {
    try {
      recipeModel
        .newRecipe()
        .then((result) => {
          success(res, result.rows, "success", "success to get new recipe")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get new recipe")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get new recipe")
    }
  },
  recipe: (req, res) => {
    try {
      const idUser = req.params.id;
      const check = parseInt(idUser);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }
      recipeModel
        .recipeUser(idUser)
        .then((result) => {
          success(res, result.rows, "success", "success to get recipe")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get recipe")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get recipe")
    }
  },
};
module.exports = recipeController;

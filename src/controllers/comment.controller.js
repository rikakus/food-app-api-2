const commentModel = require("../models/comment.model");
const { success,failed }= require('../helpers/response');

const commentController = {
  list: async(req, res) => {
    try {
      const {page, limit} = req.query
      const pageValue = page? Number(page): 1
      const limitValue = limit? Number(limit): 3
      const offset = (pageValue - 1)*limitValue
      const allData = await commentModel.allData()
      const totalData = Number(allData.rows[0].total)
      commentModel
        .listAll(limitValue,offset)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData/limitValue)
          }
          success(res, result.rows, "success", "success to get comment list",pagination)
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get comment list")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get comment list")
    }
  },
  detail: async(req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      const getData = await commentModel.detailComment(id)
      const checkId = getData.rowCount == 0? req.APP_DATA.tokenDecode.id : getData.rows[0].user_id
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if(req.APP_DATA.tokenDecode.id != checkId){
        return failed(res, 'forbidden access', "failed", "failed to get comment")
      }
      commentModel
        .detailComment(id)
        .then((result) => {
          success(res, result.rows[0], "success", "success to get comment")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get comment")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get comment list")
    }
  },
  input: async(req, res) => {
    try {
      const body = req.body;
      const { id, idRecipe, comment, idUser } = body;
      const getData = await commentModel.detailComment(id)
      const checkId = getData.rowCount == 0? req.APP_DATA.tokenDecode.id : getData.rows[0].user_id
      if (!id || !idRecipe || !comment || !idUser) {
        throw Error("parameter cannot blank");
      }else if(req.APP_DATA.tokenDecode.id != checkId){
        return failed(res, 'forbidden access', "failed", "failed to add comment")
      }
      commentModel
        .inputComment(id, idRecipe, comment, idUser)
        .then((result) => {
          success(res, result.command, "success", "success to add comment")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to add comment")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to add comment")
    }
  },
  update: async(req, res) => {
    try {
      const id = req.params.id;
      const { idRecipe, comment, idUser } = req.body;
      const check = parseInt(id);
      const getData = await commentModel.detailComment(id)
      const checkId = getData.rowCount == 0? req.APP_DATA.tokenDecode.id : getData.rows[0].user_id
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      } else if (!id || !idRecipe || !comment || !idUser) {
        throw Error("parameter cannot blank");
      }else if(req.APP_DATA.tokenDecode.id != checkId){
        return failed(res, 'forbidden access', "failed", "failed to edit comment")
      }
      commentModel
        .updateComment(id, idRecipe, comment, idUser)
        .then((result) => {
          success(res, result.command, "success", "success to edit comment")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to edit comment")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to edit comment")
    }
  },
  deleted: async(req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      const getData = await commentModel.detailComment(id)
      const checkId = getData.rowCount == 0? req.APP_DATA.tokenDecode.id : getData.rows[0].user_id
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if(req.APP_DATA.tokenDecode.id != checkId){
        return failed(res, 'forbidden access', "failed", "failed to delete comment")
      }
      commentModel
        .deleteComment(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete comment")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete comment")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete comment")
    }
  },
  commentRecipe: (req, res) => {
    try {
      const idRecipe = req.params.id;
      const check = parseInt(idRecipe);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }
      commentModel
        .comment(idRecipe)
        .then((result) => {
          if(result.rowsCount == 0){
            return failed(res, 'data not found', "failed", "failed to get comment")
          }
          success(res, result.rows, "success", "success to get comment")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get comment")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get comment")
    }
  },
};
module.exports = commentController;

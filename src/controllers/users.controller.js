const usersModel = require('../models/users.model');
const { success,failed }= require('../helpers/response');

const usersController = {
  list: async (req, res) => {
    try{
      const {page, limit} = req.query
      const pageValue = page? Number(page): 1
      const limitValue = limit? Number(limit): 2
      const offset = (pageValue - 1)*limitValue
      const allData =await usersModel.allData()
      const totalData = Number(allData.rows[0].total)
    usersModel
      .listAll(limitValue,offset)
      .then((result) => {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData/limitValue)
        }
        success(res,result.rows,'success','get all users success',pagination);
      })
      .catch((err) => {
        failed(res,err.message,'failed','get all users failed')
      });
    } catch (err) {
      failed(res,err.message,'failed','get all users failed')
    }
  },
  detail: (req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }
    usersModel
      .detailUsers(id)
      .then((result) => {
        if(result.rowCount == 0){
          return failed(res,'data not found','failed','get user detail failed')
        }
        success(res,result.rows[0],'success','get user detail success')
      })
      .catch((err) => {
        failed(res,err.message,'failed','get user detail failed')
      });
        } catch (err) {
        failed(res,err.message,'failed','get user detail failed')
      }
  },
  // input: (req, res) => {
  //   try {
  //     const body = req.body;
  //     const { id, photo, name, email, phone, password } = body;
  //     if (!id || !photo || !name || !email || !phone || !password) {
  //       throw Error("parameter cannot blank");
  //     }
  //   usersModel
  //     .inputUsers(id, photo, name, email, phone, password)
  //     .then((result) => {
  //       success(res,result.rows,'success','get all users success')
  //       res.json(result);
  //     })
  //     .catch((err) => {
  //       res.status(500).json(err.detail);
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       status: "error",
  //       message: err.message,
  //     });
  //   }
  // },
  update: async(req, res) => {
    try {
      const id = req.params.id
      const body = req.body;
      const { photo, name, email, phone, password } = body;
      const check = parseInt(id);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if ( !photo || !name || !email || !phone || !password) {
        throw Error("parameter cannot blank");
      }else if(id != req.APP_DATA.tokenDecode.id){
        return failed(res, 'forbidden access', "failed", "failed to update")
      }
    usersModel
      .updateUser(id, photo, name, email, phone, password)
      .then((result) => {
        success(res, result, "success", "success to update")
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed to update")
      });
    } catch (err) {
      failed(res, err.message, "failed", "failed to update")
    }
  },
  deleted: (req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if(id != req.APP_DATA.tokenDecode.id){
        return failed(res, 'forbidden access', "failed", "failed to delete")
      }
    usersModel
      .deleteUser(id)
      .then((result) => {
        success(res, result.command, "success", "success to delete")
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed to delete")
      });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete")
    }
  },
  active: async(req, res) => {
    try {
      const id = req.params.id
      const isActive = req.query.is_active
      const check = parseInt(id);
      if (isNaN(check) == true) {
        throw Error("input must be a number");
      }else if (isActive != 0 || isActive != 1) {
        throw Error("parameter cannot blank\n must 0 for non active or 1 for active ");
      }
    usersModel
      .activeUser(id, isActive)
      .then((result) => {
        success(res, result.command, "success", "success to active")
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed to active")
      });
    } catch (err) {
      failed(res, err.message, "failed", "failed to active")
    }
  },
};
module.exports = usersController;

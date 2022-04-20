const { failed } = require("../helpers/response");
const auth = (req, res, next) => {
    const {token} = req.headers
    if(token && token == 'qwerty12345'){
        next()
    }else{
        failed(res,'error','failed','invalid token')
    }
};
module.exports = auth;

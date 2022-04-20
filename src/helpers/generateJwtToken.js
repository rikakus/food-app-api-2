const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./env')
module.exports = async(payload)=>{
    const token = await jwt.sign(payload,process.env.JWT_SECRET)
    return token
}
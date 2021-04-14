 const jwt = require('jsonwebtoken');
const constants = require('../constants/constants');
const User = require('../models/User');
const ErrorHandler = require('../utils/ErrorHandler');
const userModel = require('../models/User');

exports.protect = async(req,res,next) => {
    let token;
    console.log(req.headers.authorization);
    if(!req.headers.authorization){
        next(new ErrorResponse("Empty Token",404));
    }

    token = req.headers.authorization;

    try{
        const decoded = jwt.verify(token, constants.JWT_SECRET);
        req.user = await userModel.findById(decoded.payload.id);
    }catch(err){
        console.log("Invalid User");
        next(new ErrorResponse("Invalid Token",404));
    }
    next();
}
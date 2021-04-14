const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../constants/constant');

const userSchema = mongoose.Schema({
    name : {type:'String', required:[true,'Name is Missing']},
    email : {type:'String', required: [true,'Email is missing'], unique:true},
    mobile : {type:'String', required: [true,'Mobile is missing'], unique:true},
    password : {type:'String', required: [true,'Password is missing']},
    photo : {type:'String', default:'no-profile-pic'}
});

// Encrypting Password ...
userSchema.pre('save',async function(next){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

// Decrypting Password ...
userSchema.methods.matchPassword = async function(reqPassword){
    return await bcrypt.compare(req,this.password);
};

// Json Web Token
userSchema.methods.getSignedJwtToken = function(){
    var payload = {
        id : this._id,
        name : this.name,
        mobile: this.mobile,
        email: this.email
    };

    return jwt.sign({ payload: payload }, constants.JWT_SECRET,{
        expiresIn: constants.JWT_EXPIRE
    });
};

module.exports = mongoose.model('user',userSchema);
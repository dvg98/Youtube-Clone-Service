const ErrorResponse = require('../utils/errorHandler');
const userModel = require('../models/users');

class User{
    static async register(req,res,next){
        try{
            let user = req.body;

            if(req.files!=null){
                user.photo = req.files.fileName.name;
            }

            else{
                user.photo = "no-profile-pic.jpg";
            }
            
            console.log(user);
            const userCreated = await userModel.create(user);

            if(!userCreated){
                console.log("Failed to add User");
                next(new ErrorResponse("Failed to Add user"));
            }

            const token = userCreated.getSignedJwtToken();
            res.status(200).json({success: true, data: "User Added Successfully", token:token});
        }catch(err){
            console.log(err.message);
            next(new ErrorResponse("User Not Added",404));
        }
    }

    static async signInUser(req,res,next){
        try{
            console.log(req.body);
            res.status(200).json({success: true, token: "Token"});
        }catch(err){
            console.log(err);
            next(new ErrorResponse("Invalid User Credentials"));
        }
    }
}

module.exports = User;
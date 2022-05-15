const  mongoose  = require("mongoose");
const jwt = require('jsonwebtoken');
const token = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    email:{
            type: String,
            required: true

        },
    
    password:{
            type: String,
            required: true

        },
    cpassword:{
            type: String,
            required: true

        },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ],

    createdAt:{
                type: Date, 
                default: Date.now
            }

})


//we are hashing the password..
userSchema.pre('save', async function (next) {
    // console.log('hey....');
    if(this.isModified('password')){


         this.password= await bcrypt.hash(this.password, 12);
         this.cpassword= await bcrypt.hash(this.cpassword, 12);

        }
    next();

});

//we are generate token 

userSchema.methods.generateAuthToken = async function () {
    
    try{

        let token = jwt.sign({ _id: this._id} , process.env.SECRET_KEY); 
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;

 
    }catch(err){
        console.log(err);

    }
}

const List = mongoose.model('List', userSchema);

module.exports= List;



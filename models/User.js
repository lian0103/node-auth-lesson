const mongoose = require('mongoose');
//套件 驗證email
const { isEmail } = require('validator');
//套件 製作雜湊後的密碼
const bycrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter psw'],
        minlength:[6,'Minimum osw is 6 characters']
    }
})

//DB saved 
UserSchema.post('save',function (doc,next) { 
    console.log('new user have created and saved',doc)

    next();
 })

 //before save 
UserSchema.pre('save',async function(next){
    console.log('user about to create & save DB', this) //this means UserSchema Instance
    let salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password,salt);

    next();
});


UserSchema.statics.login  = async function ( email , password ) {
        const user = await this.findOne({ email });
        if(user){
            console.log(user);
            const auth = await bycrypt.compare(password,user.password); //比對存在mangoDB 被hash的密碼
            if(auth){
                return user;
            }
            throw Error('incorrect password')
        }
        throw Error('incorrect email')
  }


const User = mongoose.model('user',UserSchema)

module.exports = User;
const USer = require('../models/User')
const User = require('../models/User')

const handleError = (err) => {
    console.log(err.message ,err.code );
    let errors = {
        email:'',
        password:''
    }
    //duplicate error code
    if(err.code == 11000){
        errors.message = 'that mail is already registered'
        return errors;
    }

    //validattion error code
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        })
        
    }

    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { email , password } = req.body;

    try{
        let user = await User.create({ email , password });
        res.status(201).json(user);
    }catch(err){
        let errors = handleError(err);
        res.status(400).json({errors});
    }

}

module.exports.login_post = async (req, res) => {
    const { email , password } = req.body;
    console.log(email,password);
    res.send('user login')
}
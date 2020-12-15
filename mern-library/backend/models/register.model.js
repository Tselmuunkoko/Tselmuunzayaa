const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    username :{ type:String, required:true},
    bookname:{type:String,required:true},
    state:{type:String,required:true},
    date:{type:Date,required:true}
},{
    timestamps:true
})

const Register = mongoose.model('Register',registerSchema);

module.exports =  Register;
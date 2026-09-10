import mongoose  from "mongoose";

let redgNoSchema= new mongoose.Schema({
    registration_no:{
        type:Number,
        required:true
    },

})

let redgNo= mongoose.model('registration_no',redgNoSchema)
// redgNo.create({registration_no:220000})

export default redgNo
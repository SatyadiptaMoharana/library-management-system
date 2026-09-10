import mongoose from "mongoose";


let requestBookSchema= new mongoose.Schema({
       studentName:{
        type:String,
        required:true
       },
       studentEmail:{
        type:String,
        required:true
       },
       bookName:{
        type:String,
        required:true
       },
       date:{
        type:String,
        required:true
       },
       status:{ 
        type:String,
        required:true 
       }
})


export default mongoose.model('requestBookModel',requestBookSchema)
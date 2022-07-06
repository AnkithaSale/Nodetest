const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const studentdataSchema=new Schema({
    Id:{},
    Name:{type:String},
    Age:{},
    Mark1:{type:String},
    Mark2:{type:String},
    Mark3:{type:String},
   status:{}

})
module.exports=mongoose.model('Studentdata',studentdataSchema);
const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    name: {type:String,required:true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true }, 
    
   
});

const Item=mongoose.model('Item',itemSchema);

module.exports=Item;
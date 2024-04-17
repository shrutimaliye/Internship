const mongoose = require('mongoose');

const MacSchema=new mongoose.Schema({
    macAddress:{
        type:String,
        required: true,
        unique: true,
    },
});

const macmodel = mongoose.model("macAddress", MacSchema);
module.exports=macmodel;
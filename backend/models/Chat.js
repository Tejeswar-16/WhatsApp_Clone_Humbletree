const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: {type:String,required:true},
    receiverId: {type:String,required:true},
    senderName: {type:String,required:true},
    message: {type:String,required:true},
    time: {type:Date,default:Date.now},
    deletedFor: {type:[String],default:[]}
});

const Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat;
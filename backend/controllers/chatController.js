const Chat = require("../models/Chat.js");

const sendMessage = async (req,res) => {
    try{
        const {senderId,receiverId,senderName,message} = req.body;
        const newChat = new Chat({senderId,receiverId,senderName,message});
        await newChat.save();
        res.status(200).json({"message":"Message sent successfully"});
    }
    catch(error){
        console.log(error);
    }
}

const getChat = async (req,res) => {
    try{
        const {senderId,receiverId} = req.body;
        const chat = await Chat.find(
            {$or: [
                    {senderId: senderId, receiverId: receiverId},
                    {senderId: receiverId, receiverId: senderId}
                  ]
            });
        res.json(chat);
    }
    catch(error){
        console.log(error);
    }
}

const editChat = async (req,res) => {
    try{
        const id = req.params.id;
        const { message } = req.body;
        await Chat.updateOne({_id: id},{$set: {message: message}});
        res.json({"message":"Edited successfully"});
    }
    catch(error){
        console.log(error);
    }
}

const deleteMeChat = async (req,res) => {
    try{
        const id = req.params.id;
        const { senderId } = req.body;
        await Chat.updateOne({_id:id},{$addToSet:{deletedFor: senderId}});
        res.json({"message":"Deleted successfully"});
    }
    catch(error){
        console.log(error);
    }
}

const deleteAllChat = async (req,res) => {
    try{
        const id = req.params.id;
        const { senderId, receiverId } = req.body;
        await Chat.updateOne({_id:id},{$addToSet:{deletedFor: { $each: [senderId, receiverId] }}});
        res.json({"message":"Deleted successfully"});
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    sendMessage: sendMessage,
    getChat: getChat,
    editChat: editChat,
    deleteMeChat: deleteMeChat,
    deleteAllChat: deleteAllChat
}
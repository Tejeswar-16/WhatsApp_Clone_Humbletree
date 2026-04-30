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

module.exports = {
    sendMessage: sendMessage,
    getChat: getChat
}
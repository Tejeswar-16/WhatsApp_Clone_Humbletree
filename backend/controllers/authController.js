const Auth = require("../models/Authentication.js");

const register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const user = await Auth.findOne({email: email});
        if (user)
            return res.status(401).json({"message":"User already exists"});
        const newUser = new Auth({name,email,password});
        await newUser.save();
        res.status(201).json({"message":"User created successfully"});
    }
    catch(error){
        console.log(error);
    }
};

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await Auth.findOne({email: email,password: password});
        if (user)
            res.status(200).json({"message":"Login successful",user});
        else
            res.status(400).json({"message": "Invalid email or password"});
    }
    catch(error){
        console.log(error);
    }
};

const getUsers = async (req,res) => {
    try{
        const id = req.params.id;
        const users = await Auth.find({_id: {"$ne": id}});
        if (users.length !== 0)
            res.status(200).json(users);
        else
            res.status(400).json({"message":"No chats found"})
    }
    catch(error){
        console.log(error);
    }
};

const getUserById = async (req,res) => {
    try{
        const id = req.params.id;
        const users = await Auth.findOne({_id: id});
        if (users.length !== 0)
            res.status(200).json(users);
        else
            res.status(400).json({"message":"No chats found"})
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {
    register: register,
    login: login,
    getUsers: getUsers,
    getUserById: getUserById
}
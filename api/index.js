const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import { WebSocketServer } from "ws";
//DB Models
const {Message, Community, Candidate, User, Annoucement, Election, Poll, CommunityPoll} = require("./model/Schemas");
require("dotenv/config");

//Initialize the server
const port = process.env.PORT || 3330;
const app = express(); 
const server = http.createServer(app).listen(port); 
const io = socketIo(server) || socketIo.listen(server);

app.use(bodyParser.json());

const { MongooseClient } = require("./init");
const { default: user } = require("../components/user");
const { async } = require("@firebase/util");

MongooseClient().then(()=>{
    () => {
        console.log("Connected to DB");
    }
});

// server.listen(PORT, () => console.log(`Server is Quannected to Port ${PORT}`))
let users = [];

// author.stories.push(story1);
// author.save(callback);


exports.addUser = async({ user_id, name, updatedChannel }) => {
    if (!name || !updatedChannel) return { error: "user_id and Channel required." };
    const add = await Community({});
    if(!add) return {error: "There's no Community here"};
    const isMember = await Community.find({_id: updatedChannel}).populate({
        path: 'memberIds',
        match: { $gte: user_id }
    }).exec();
    if(!isMember){
        add.memberIds.push(id);
        add.save(callback);
    }
    const user = callback;
    return { user };
};

exports.getUserCommunity = async(User) => {
    if (!User) return { error: "No User found"};
    const add = await Community({});
    if(!add) return {error: "There's no Community here"};
    const user_id = User.user_id;
    const isMember = await Community.find().populate({
        path: 'memberIds',
        match: { $gte: user_id },
        select: 'name'
    }).exec();

    if(!isMember <= 0){
        return isMember
    }
}

exports.removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    return users[index];
};

exports.addCandidate = () => {}

exports.addCandidate = () => {}


// const chatSocket = io.of("/chat");

// chatSocket.on("connection", chat => {

// })

// app.post('/createChannel', (req, res) =>{
//     const q = Community.find({name: req.body.name});
//     q
//     .exec()
//     .then(data =>{
//         if(data.lenght === 0){
//             const channel = new Community({
//                 memberIds: '',
//             })
//         }
//     })
// })

// app.get('/channel/:id', (req, res) =>{
//     const q = Community.find({ _id: req.params._id});
//     q.exec().then(data =>{
//         if(data.lenght === 0){
//             res.status(404).json(`no community with id: ${req.params._id}`);
//         }
//     });
// });

// app.get('/listchannel/:id', (req, res) =>{
//     const q = Community.find({ _id: req.params._id}).populate('memberIds');
//     q.exec().then(data =>{
//         if(data.lenght === 0){
//             res.status(404).json(`you have no community`);
//         }
//     });
// })

// app.post('/newelection', (req, res) =>{
//     const q = new Election(req);
//     q.exec().then(data =>{
//         if(data.lenght === 0){
//             const channel = new Community({
//                 memberIds: '',
//             })
//         }
//     })
// })

// app.post('/announcement', (req, res) =>{
//     const q = Community.find({name: req.body.title});
//     const newAnnouncement = new Annoucement(req.body);
//     newAnnouncement.save().then(data => {
//         res.json(data);
//     }).catch(error => {
//         res.json(error);
//     });
    
// });

// app.get('/announcement', (req, res) =>{
//     const announcement = Annoucement.find();
//     announcement.exec().then(data=>{
//         if (data === null) {
//             res.status(404).json('I dont have that');;
//         } else {
//             res.json(data);
//         }
//     }).catch(error => {
//         res.json(error);
//     });;

// });

// var clients = [];

// io.on("connection", socket => {
//     console.log("New User Connected");
//     socket.on("storeClientInfo", function(data) {
//         console.log(data.customId + " Connected");
//         var clientInfo = new Object();
//         clientInfo.customId = data.customId;
//         clientInfo.clientId = socket.id;
//         clients.push(clientInfo);

//         const res = User.updateOne({ id: data.customId }, { status: 'online' });
//         res.exec().then(() => {
//         console.log("Activated " + data.customId);

//         //Notify others
//         socket.broadcast.emit("update", "Updated");
//         console.log("emmited");
//         });
//     });

//     socket.on("disconnect", function(data) {
//         for (var i = 0, len = clients.length; i < len; ++i) {
//           var c = clients[i];
//           if(c.clientId == socket.id){
//             clients.splice(i, 1);
//             console.log(c.customId + " Disconnected");
//             const res = User.updateOne({ id: c.customId }, { status: 'offline' });
//             res.exec().then(data => {
//               console.log("Deactivated " + c.customId);
//               socket.broadcast.emit("update", "Updated");
//             });
//             break;
//           }
//         };
//     });
// })

// serve.on('connection', (stream) =>{
//     io.to(serve).emit(stream);
// })
// import { Counter, rootSagas } from './sagas'
// import Vote from '../../screens/Election/Vote';

// class Election {
//     id: any
//     state: any;
//     voter: any

//     constructor() {
//         // super()
//         this.state = {
//             voters: [],
//             voteCount: 0,
//             candidates: [],
//             voter: []

//         }
//     }

    

//     private checkIfVoted = () => {
//         if(this.state.voters.find((voter:any) =>{
//             if(voter.hasVoted === true){
//                 return voter.push(voter)
//             };
//             return false;
//         })){
//             return true;
//         }
//     }

//     onElectionStart(io:any, currentUser:any, candidate:any){
//         //server side
//         io.engine.generateId = function (req:any) {
//             // generate a new custom id here
//             return currentUser.userID
//         }
//         var voters = 0;
//         let votersIDs = [''];
//         io.sockets.on("connection", function(socket:any) {
//             voters++;
//             io.sockets.emit("online", voters);
//             socket.on("vote", function(userID:any, candID:any, callback:any){

//             });
//         });
//         io.sockets.on("storeClientInfo", function(user_id:any){
//             votersIDs.push(user_id);
//             let new_voters = {
//                 voter_id: votersIDs
//             };
//             io.sockets.emit("VoterIds", new_voters);
//         });

        

//         io.sockets.on("disconnect", function(socket:any){
//             --voters;
//             for( var i = 0; i < votersIDs.length; i++){ 
//                 if ( votersIDs[i] === socket.id) { 
//                     votersIDs.splice(i, 1); 
//                     break;
//                 }
//             };
//             io.sockets.emit("voter_left", socket.id)
//         });

//         //voter side
//         var socket = io.connect('http://localhost');
//         socket.on('connect', function(){
//             socket.emit('storeClientInfo', currentUser.userID);
//             socket.on('new_voters', function(new_voters:any){
//                 console.log(" New Connection");
//                 return new_voters;
//             });

//             socket.emit('vote', currentUser.userID, candidate.id, (res:any) =>{
//                 console.log(" Vote Response");
//                 res.status
//                 let count = 0;
//                 setInterval(() => {
//                 socket.volatile.emit("ping", ++count);
//                 }, 1000);
//             })
//         }); 


//         // var allSockets = [];
//         // io.sockets.on('connection', function(socket) {
//         //     var userId = allSockets.push(socket);
//         // socket.on('r', function(message) {
//         //     socket.broadcast.emit('newChatMessage_response', {data: message});
//         // });
//         // socket.on('privateChatMessage', function(message, toId) {
//         //     allSockets[toId-1].emit('newPrivateMessage_response', {data: message});
//         // });
//         // socket.broadcast.emit('newUserArrival', 'New user arrived with id of: ' + userId);
//         // });

//     }

//     electionHandler = class{
//         voter: any
//         voterID: any

//         onVoterJoined(voterID: any){  

//         }

//         onVoterVotesCandidate(voterID: any, candidateID:any){

//         }

//         onVoterNoClick(voterID: any){

//         }


//     }
 



// }
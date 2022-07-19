import { query } from "firebase/firestore";
import { Server } from "socket.io";
const io = new Server(32000);
let log = console.log

io.of("chat").on("connection", socket =>{
    socket.emit("hello from election server", 1, "2", { 3: Buffer.from([4]) });
    log("Connected to chat");

    socket.on("updateMessage", (args, callback)=>{
        log("Message update");
        socket.broadcast.emit("onMessageUpdated", args, callback);
    });

    socket.on("receiveMessage", (args, callback)=> {
        log("Message received");
        if (!args.file) {
            log(`Messae from ${args.sender} received!`);
            const message = JSON.parse(args);
            callback(message);
        } else if(args.file) {
            log(`Messae from ${args.file} received!`);
            const message = JSON.parse(args);
            callback(message);
        }
        socket.broadcast.emit("onMessageReceived", args, callback);
    });

    socket.on("deleteMessage", (args, callback)=> {
        log("Message Deleted");
        socket.broadcast.emit("onMessageDeleted", args, callback);

    });
    socket.on("userLeave", (args, callback)=> {
        log("User Left");
        socket.broadcast.emit("onUserLeft", args, callback);

    });
    socket.on("onCallStarted", (args, callback)=> {
        log("Group Call Started");
        socket.broadcast.emit("onCallStarted", args);

    });
    socket.on("deleteChannel", (args, callback)=> {
        log("Message received");
        socket.broadcast.emit("onChannelDeleted", args, callback);

    });
    socket.on("disconnect", () => {
        log("Disconnected");
        socket.broadcast.emit("onReconnectFailed");
    });
});



export const Channel = class {

    constructor(
        url,
        members,
        sender,
        GroupChannel
    )

    markAsRead(){

    };

    createPreviousMessageListQuery(){

        const query = ''
        return query;
    }

    

    sendUserMessage(params){
        socket.emit("receiveMessage", params, (response ,err) => {
            console.log(response); 
        });
    }

    sendFileMessage(params){
        socket.emit("receiveMessage", params, (response ,err) => {
            console.log(response);
        });

    }

    getUnreadMemberCount(){

    }

    VideoChat = class{
        constructor(

        )
        onStartChat(){

        }

        onJoinChat(){

        }

        onEndChat(){

        }
    }
}
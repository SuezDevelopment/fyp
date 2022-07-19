import { io } from "socket.io-client";
const socket = io.of("chat");
import { addUser,getUserCommunity } from "../api";

export const Handler = class {
    constructor(
        message,
        currentUser,
    )

    setForegroundState(){

    };
    setBackgroundState(){

    }
    addConnectionHandler(chat, event){
        return io.of(chat).on("connection",event);
    };

    addChannelHandler(chat, event){
        return io.of(chat).on("message", event);
    }

    removeConnectionHandler(chat){
        return io.of(chat).on("disconnect");
    }

    EventEmitter();

    removeChannelHandler(chat){

    }
    registerAPNSPushTokenForCurrentUser(token){

    }

    registerGCMPushTokenForCurrentUser(token){
         
    }

    getUserFeaturedCommunity(User){
        const {channel} = getUserCommunity(User);
        return channel;
    };

    ConnectionHandler = class{
        constructor(

        )
        onReconnectStarted(){
            socket.on("connect", (...args) => {

            })
        };
        onReconnectSucceeded(){
            socket.on("connect", (...args) => {

            })
        }

        onReconnectFailed(){
            socket.on("connect_error", (...args) => {
                
            });
        }
    };

    GroupChannelParams = class{
        constructor(
            
        )

        addUsers(selectedUsers){
            let selected = [];
            if (selectedUsers.length > 0) {
                for(let i = 0; i < selectedUsers.length;i++){
                    let server = selectedUsers[i];
                    selected.push(server);
                }
            }
            if(selected)
            return selected;
        }

        GroupChannel = class{
            createChannel(selectedUsers){
                for(let i = 0; i < selectedUsers.length;i++){
                    let server = selectedUsers[i];
                    user.selectedUsers.push(server)
                    if (user.selectedUsers > 0) {
                        if (!user.selectedUsers.at({id, username, room})) return { error: "name and room required." };
                    }
                }
            };

            createMyGroupChannelListQuery(){

            }
        }
    }

    ChannelHandler = class{
        constructor(
            channel,
            user
        )

        onUserJoined(updatedChannel, user_id){
            socket.on("join", ({ user_id, updatedChannel}, callBack) => {
                const { user, error } = addUser({ id: socket.id, user_id, updatedChannel });
                if (error) return callBack(error);
                const room = user.updatedChannel.community_id
                socket.join(room);
                socket.in(room).emit("message", {
                    user: "Admin",
                    text: `Welocome to ${user.room}`,
                });
                callBack(null);
            });
        }

        onMessageReceived(){
            socket.on("onMessageReceived", (targetChannel, message) => {
    

            })

        }
        ongingVideoChat(){
            socket.on("videoChatStarted", (targetChannel, message) => {
    
            });
        }

        onMessageUpdated(){
            socket.on("onMessageUpdated", (...args) => {

            });
        }


        onMessageDeleted(){
            socket.on("onMessageDeleted", (...args) => {

            });
        }
        onReadReceiptUpdated(){
            socket.on("onMessageDeleted", (...args) => {

            });
        }

        onUserLeft(channel, user){
            socket.on("onUserLeft", (...args) => {

            });
        }

        onChannelDeleted(){
            socket.on("onMessageDeleted", (...args) => {

            });
        }

        onChannelChanged(updatedChannel){
            socket.on("onChannelChanged", (...args) => {

            });
        }
    }



}
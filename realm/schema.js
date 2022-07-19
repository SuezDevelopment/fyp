import Realm,{ createRealmContext } from "realm";
const gId = new Realm.BSON.ObjectId();

const currentUser = null;

const ElectionSchama = {
    name: "Election",
    properties:{
        _id: gId,
        type: 'string?',
        startedAt:'date',
        endedAt:'date',
        candidates:"Candidate[]",
        isOpen:{type:'bool', default: false}
    }
};

const CommunitySchema = {
  name: "Community",
  properties:{
    _id: gId,
    name:'string',
    description:'string',
    memberCount:'int',
    memberIds:'int[]',
    comunityType:'',
    comunityUrl:'',
    coverImage:'',
    messages:'Message[_id]',
    lastMessage:'string',
    unreadMessageCount:'int',
    updatedAt:{type: 'date', default: new Date()},
    operatorUserIds:'int[]',
    createdAt:'date',
    isApproved:{type:'bool', default:false}
  }
}

export const NewInfoSchema = {
    name: "NewInfo",
    properties:{
        _id: gId,
        title:"string",
        body:"string",
        createdAt: new Date()
    },
    primaryKey:'_id',
}

// export class Candidate {
//     constructor({})
// }

export const CandidateSchama = {
    name: "Candidate",
    properties:{
        _id: gId,
        candidate_id:'int',
        fullname: 'string',
        position:'string',
        matric_no:'string',
        department:'string',
        bio:'string?',
        voteCount: { type: "int", default: 0 },
        voteBy: 'User.user_id[]'
    },
    primaryKey:'candidate_id',
};

export const MessageSchema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
      id: 'string',
      uidFrom: {type: 'string', optional: true},
      uidTo: {type: 'string', optional: true},
      key: {type: 'string', optional: true, default: ''},
      _id: {type: 'string'},
      text: {type: 'string', optional: true, default: ''},
      createdAt: {type: 'int', optional: true},
      status: {type: 'int', default: 0},
      sent: {type: 'bool', default: false},
      received: {type: 'bool', default: false},
      type: {type: 'int', default: 0},
      image: {type: 'string', optional: true, default: ''},
      audio: {type: 'string', optional: true, default: ''},
      video: {type: 'string', optional: true, default: ''},
      location: {type: 'string', optional: true, default: ''},
      document: {type: 'string', optional: true, default: ''},
      sound: {type: 'string', optional: true, default: ''},
    },
};

export const ChatSchema = {
    name: 'Chat',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: {type: 'string', optional: true},
      uidFrom: {type: 'string', optional: true},
      uidTo: {type: 'string', optional: true},
      lastMessageId: {type: 'string', optional: true},
      lastMsgText: {type: 'string', optional: true},
      lastMsgDate: {type: 'int', optional: true},
      status: {type: 'int', default: 0},
      sent: {type: 'bool', default: false},
      received: {type: 'bool', default: false},
      typ: {type: 'int', default: 0},
    },
};

export const UserSchema = {
    name: "User",
    properties:{
        _id: gId,
        user_id:'int',
        fullname: 'string',
        matric_no:'string',
        department:'string',
        bio:'string?',
        phone_no:'string?',
        email:'string?',
        hasVoted:'bool',
        photo: {type: 'string', optional: true},
    },
    primaryKey:'user_id',
};

export const realm = new Realm({
    path: 'RNChat.realm',
    schema: [
      UserSchema,
      ContactSchema,
      MessageSchema,
      MessageQueueSchema,
      ChatSchema,
    ],
});

export const updateUser = ({fullName, username}) => {
    realm.write(() => {
      realm.create(
        'User',
        {
          id: currentUser.id,
          username: username,
          fullName: fullName,
        },
        true,
      );
    });
};

export const updateVotes = ({}) =>{
    realm.write(() => {
        realm.create(
          'Candidate',
          {
            id: currentUser.id,
            username: username,
            fullName: fullName,
          },
          true,
        );
      });
};

export const getChats = () => {
    let chats = realm.objects('Chat');
    return chats.sorted('lastMsgDate', true);
};

export const getCurrentUser = () => {
    let users = realm.objects('User');
    if (users.length > 0) {
      users.forEach(user => {
        currentUser = user;
      });
    }
    return currentUser;
};

export const updatePassword = newPassword => {
    currentUser = {...currentUser, password: newPassword};
    updateUser(currentUser);
};

export const deleteMessages = () => {
    realm.write(() => {
      let messages = realm.objects('Message');
      realm.delete(messages);
      let messagesQueue = realm.objects('MessageQueue');
      realm.delete(messagesQueue);
    });
};

export class Community {
    constructor({id = new Realm.BSON.ObjectID(), description,isComplete=false}) {
        createdAt = new Date();

    }
}

export const { useRealm, useQuery, RealmProvider } = createRealmContext({
    schema: [NewInfoSchema, CandidateSchama],
    deleteRealmIfMigrationNeeded: true,
  });

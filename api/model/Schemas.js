// import { gql } from 'apollo-server';

// export const typeDefs = gql`
//   scalar Date

//   input CreateMessageInput {
//     CommunityId: Int!
//     text: String!
//   }

//   input CreateCommunityInput {
//     name: String!
//     userIds: [Int!]
//   }
//   input CreateAnnoucementInput {
//     title: String!
//     description: String!
//     announcedAt: Date!
//   }

//   input UpdateCommunityInput {
//     id: Int!
//     name: String
//     userIds: [Int!]
//   }

//   input ConnectionInput {
//     first: Int
//     after: String
//     last: Int
//     before: String
//   }

//   input CreatePollInput {
//     title: String!
//     polls: [Poll]!
//     inProgress: Boolean!
//   }

//   input CreateElectionInput {
//     inProgress: Boolean!
//     endedAt: Date!
//     candidates: [Candidate!]
//   }

//   input CreateCandidateInput {
//     candidate_id: Int!
//     fullname: String
//     position: String
//     matric_no: String
//     department: String
//     bio: String
//   }

//   type MessageConnection {
//     edges: [MessageEdge]
//     pageInfo: PageInfo!
//   }
//   type MessageEdge {
//     cursor: String!
//     node: Message!
//   }
//   type PageInfo {
//     hasNextPage: Boolean!
//     hasPreviousPage: Boolean!
//   }

//   type Candidate {
//     id: String!,
//     candidate_id: Int!
//     fullname: String,
//     position: String
//     matric_no: String
//     department: String
//     bio: String
//     voteCount: Int
//     voteByUserIds:[User]
//   }

//   type Election {
//     id: Int!,
//     inProgress: Boolean!
//     endedAt: Date!
//     candidates: [Candidate!]
//   }

//   type Subscription {
//     messageAdded(groupIds: [Int]): Message
//     communityAdded(userId: Int): Community
//   }

//   type CommunityPoll {
//     id: Int!
//     title: String!
//     polls: [Poll]!
//     inProgress: Boolean!
//   }

//   type Poll {
//     id: Int!,
//     pollMessage: String!
//     pollOption: [String]!
//     pollResult: [PollResult]!,
//     votesBy: [User]
//   }

//   type PollResult {
//     count: Int!
//     PollOption: String!
//   }


//   type Community {
//     id: Int! # unique id for the Community
//     name: String # name of the Community
//     description: String # description of the Community
//     isApproved: Boolean!,
//     comunityUrl: String!
//     operatorUserIds: [User]!
//     coverImage: String
//     members: [User]! # users in the Community
//     messages(messageConnection: ConnectionInput): MessageConnection # messages sent to the Community
//   }

//   type Annoucement {
//     id: Int!,
//     title: String!
//     description: String!
//     announcedAt: Date!
//   }

//   type User {
//     id: Int! # unique id for the user
//     email: String! # we will also require a unique email per user
//     username: String # this is the name we'll show other users
//     fullname: String,
//     matric_no: String,
//     department: String,
//     messages: [Message] # messages sent by user
//     Community: [Community] # Communitys the user belongs to
//     friends: [User] # user's friends/contacts
//     jwt: String # json web token for access
//   }

//   type Query {
//     user(email: String, id: Int): User
//     messages(communityId: Int, userId: Int): [Message]
//     community(id: Int!): Community
//     candidate(id: Int!): Candidate
//     election(id: Int!): Election
//     announcement(id: Int!): [Annoucement]
//   }


//   type Mutation {
//     createMessage(message: CreateMessageInput!): Message
//     createCommunity(community: CreatecommunityInput!): Community
//     createPoll(poll: CreatePollInput!): CommunityPoll
//     createCandidate(candidate: CreateCandidateInput!): Candidate
//     createElection(election: createElectionInput!): Election
//     deletecommunity(id: Int!): Community
//     leavecommunity(id: Int!): Community # let user leave community
//     updatecommunity(community: UpdatecommunityInput!): Community
//     login(user: SigninUserInput!): User
//     signup(user: SigninUserInput!): User
//   }

//   schema {
//     query: Query
//     mutation: Mutation
//     subscription: Subscription
//   }
// `

// // const AnnoucementSchema = new Schema({
// //     _id: Schema.Types.ObjectId,
// //     title: {type: String, default: "", required: true},
// //     description: {type: String, default: "", required: true},
// //     announcedAt: {type: Date, default: Date.now},
// // },
// // {
// //     strict: false
// // });

// // const Annoucement = model('Annoucement', AnnoucementSchema);

// // const UserSchema = new Schema({
// //     _id: {type: Schema.Types.ObjectId, required: true},
// //     user_id: {type: String, unique: true},
// //     fullname: String,
// //     matric_no: String,
// //     department: String,
// //     bio: {type: String, optional: true},
// //     phone_no: {type: Number, optional: true},
// //     status:{type: String, enum:["online","away","offline"], default: 'online'},
// //     email: {type: String, optional: true},
// //     hasVoted: {type: Boolean, optional: true, default: false},
// //     isOperator: {type: Boolean, optional: true, default: false, ref: 'Community'},
// //     hasVotedFor: {type: [CandidateSchema], optional: true, default: {}, ref:"Candidate"},
// //     photo: {type: String, optional: true},
// // },
// // {
// //     strict: false
// // });

// // const User = model('User',UserSchema);

// // const ElectionSchema = new Schema({
// //     _id: {type: Schema.Types.ObjectId, required: true},
//     // inProgress: {type: Boolean, default: false},
//     // endedAt: {type: Date, default: Date.now},
//     // candidates: {type: [CandidateSchema], default: {}, ref:'Candidate'}
// // },
// // {
// //     strict: false
// // });

// // const Election = model('Election', ElectionSchema);

// // const CandidateSchema = new Schema({
//     // _id: {type: Schema.Types.ObjectId, required: true},
//     // candidate_id: Schema.Types.ObjectId,
//     // fullname: String,
//     // position: String,
//     // matric_no: String,
//     // department: String,
//     // bio: String,
//     // voteCount: {type: Number, default: 0},
//     // voteByUserIds:{type:[UserSchema], ref:'User'},
// // },
// // {
// //     strict: false
// // });

// // const Candidate = model('Candidate',CandidateSchema);


// // const CommunitySchema = new Schema({
// //     _id: {type:Schema.Types.ObjectId, required: true},
// //     Community_id: {type: String, ref:'Message', required: true},
// //     name: {type: String, required: true, unique: true},
// //     description: String,
// //     memberCount: {type: Number, default: 0},
// //     memberIds: {type: [ String ], ref:'User'},
// //     comunityType: {type: String, enum:['Private','Public'], default:'Private'},
// //     comunityUrl: {type: String, ref:'Community', unique: true},
// //     messagesIds: {type: [String], ref:'Message', unique: true},
// //     lastMessage: {type: String, ref:'Message', default: ''},
// //     unreadMessageCount: Number,
// //     updatedAt: {type: Date, default: Date.now},
// //     operatorUserIds: {type:[String], ref:'User', unique: true},
// //     createdAt: {type: Date, default: Date.now},
// //     isApproved: {type: Boolean, default: false},
// // },
// // {
// //     strict: false
// // });

// // const Community = model('Community', CommunitySchema);

// // const updateProfile =(valueProps)=>{
// //     return fetch('/api/updateProfile', {
// //         method: 'post',
// //         headers: {
// //             'Accept': 'application/json',
// //         },
// //         body: JSON.stringify(valueProps)
// //     });
// // }



// // // const isMember = () => {
// // //     function Do(doc, next) {
// // //         const mIds = doc.populate('memberIds').then(function() {
// // //             next();
// // //         });
// // //         const isApprvd = doc.populate('isApproved').then(function() {
// // //             next();
// // //         });
// // //     };
// // //     return doAfter(CommunitySchema,'save',Do(doc, next));
// // // };

// // const isApproved =()=> {
// //     function Do(doc, next) {
// //         doc.populate('isApproved').then(function() {
// //           next();
// //         });
// //     };
// //     return doAfter(CommunitySchema,'save',Do(doc, next))
// // }

// // // const Community = model('Community', CommunitySchema);


// // const MessageSchema = new Schema({
// //     _id: {type: new Schema.Types.ObjectId, required: true},
// //     uidFrom: {type: String, optional: true},
// //     uidTo: {type: String, optional: true},
// //     key: {type: String, optional: true, default: ''},
// //     messageId: {type: [Schema.Types.ObjectId], ref:'Message'},
// //     messageReply:{type: [Schema.Types.ObjectId], ref:'Message'},
// //     message: {type: String, optional: true, default: ''},
// //     createdAt: {type: Date, default: Date.now},
// //     status: {type: String, enum:['typing...','idle...', undefined]},
// //     sent: {type: Boolean, default: false},
// //     received: {type: Boolean, default: false},
// //     type: {type:  String, default: 'text', enum:['string','image','audio','location','video','document','poll', undefined]},
// //     image: {type: String, optional: true, default: ''},
// //     audio: {type: String, optional: true, default: ''},
// //     video: {type: String, optional: true, default: ''},
// //     location: {type: String, optional: true, default: ''},
// //     document: {type: String, optional: true, default: ''},
// //     sound: {type: String, optional: true, default: ''},
// // },
// // {
// //     strict: false
// // });

// // const Message = model('Message', MessageSchema);


// // const CommunityPollSchema = new Schema({
// //     _id: Schema.Types.ObjectId,
// //     title: String,
// //     polls: {type: [PollSchema], ref:'Poll', default: {}},
// //     inProgress: {type: Boolean, default: false}

// // },
// // {
// //     strict: false
// // });

// // const CommunityPoll = model('CommunityPoll', CommunityPollSchema);


// // const PollSchema = new Schema({
// //     _id: Schema.Types.ObjectId,
// //     pollMessage: String,
// //     pollOption: {type: [String], default: {}},
// //     pollResult: {type: Map, of:{
// //         type: Schema.Types.ObjectId,
// //         ref: 'CommunityPoll'
// //     }},
// //     votesBy: {type: [Schema.Types.ObjectId], ref: 'User'}
// // },
// // {
// //     strict: false
// // }
// // );

// // const Poll = model('Poll', PollSchema);





// // const onNewMessage = () => {
// //     function Do(doc, next) {
// //         doc.populate('messageId').then(function() {
// //           next();
// //         });
// //     };
// //     return doAfter(MessageSchema,'save',Do(doc, next));
// // };

// // module.exports = { Message, Community, Candidate, User, Annoucement, Election, Poll, CommunityPoll}







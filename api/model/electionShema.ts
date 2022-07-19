// import{ db } from "../db/index.ts";
// import { Collection, ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";

// export interface ElectionSchema {
//     _id: {
//         $oid: ObjectId;
//     };
//     inProgress: boolean,
//     createdAt: Date,
//     endedAt: Date,
//     candidates: {type: [string], default: {}, ref:'Candidate'}
// }

// export interface CandidateSchema {
//     _id: {
//         $oid: ObjectId;
//     },
//     candidate_id: string,
//     fullname: string,
//     position: string,
//     matric_no: string,
//     department: string,
//     bio: string,
//     voteCount: {type: number, default: 0},
//     voteByUserIds:{ type:[string], ref:'User'}
// }

// export const _Election: Collection<T> = db.collection("Election");
// export const _Candidate = db.collection("Candidate");

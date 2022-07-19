// deno-lint-ignore-file no-explicit-any no-obj-calls
// import {_Election} from '../../model/electionShema.ts';
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
const { ELECTION_DATA_KEY, ELECTION_APP_ID } = config();
const BASE_URI = `https://data.mongodb-api.com/app/data-uzmea/endpoint/data/v1/action/findOne`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "src-app";
const COLLECTION = "election";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": ELECTION_DATA_KEY 
  },
  body: ""
};

/**
 * Create a task
 * @param param
 */
export const add_election = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = { 
          success: false,
          msg: "No Data",
        };
        return;
      }
      const {
        value: { electionId ,candidates },
      } = await request.body();
      const URI = `${BASE_URI}/insertOne`;
  
      const task = JSON.stringify({
        electionId,
        inProgress: false,
        createdAt: new Date(),
        candidates
      });
  
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: task
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
  
      response.status = 201;
      response.body = { election: { id: insertedId.$oid, item: task } };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
};
export const get_election = async ({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) => {
    try {
      const URI = `${BASE_URI}/findOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        filter: { electionId: parseInt(params.id)}
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const election = await dataResponse.json();

      if (election) {
        response.status = 200;
        response.body = {
          success: true,
          data: election,
        };
      } else {
        response.status = 404;
        response.body = {
          success: false,
          msg: "No todo found",
        };
      }
    }  catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
}
export const get_elections =  async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const elections = await dataResponse.json();

    if (elections) {
      response.status = 200;
      response.body = {
        success: true,
        data: elections,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
}

export const update_election_progress =  async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      const body = await request.body();
      const { inProgress } = await body.value;
      const URI = `${BASE_URI}/updateOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        filter: { electionId: parseInt(params.id)},
        update: { $set: { inProgress }}
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const electionUpdated = await dataResponse.json();
      
      response.status = 200;
      response.body = { 
        success: true,
        electionUpdated 
      };
      
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
};
export const isStarted =  async ({}) => {}
// export const update_election =  async ({}) => {}
import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { add_election, get_elections, get_election, update_election_progress} from "./control/election/election.ts"; // Import controller methods
import {createUser} from "./control/user/index.ts"
const router = new Router();
const _router1 = new Router();

// Implement routes
router
    .post("/api/election", add_election)
    .get("/api/election", get_elections)
    .get("/api/election/:id", get_election)
    .put("/api/election/:id", update_election_progress)
     // Add an election
_router1.post("/user", createUser);
export default router
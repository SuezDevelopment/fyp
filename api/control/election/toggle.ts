// deno-lint-ignore-file no-explicit-any
import {_Election} from '../../model/electionShema.ts';
/**
 * Create a task
 * @param param0
 */
const checkOid = (oid: string) => {
  return new RegExp("^[0-9a-fA-F]{24}$").test(oid);
};

export const toggleElection = async ({
    request,
    response,
    params,
  }:{
    request: any;
    params: { id?: string };
    response: any;
  }) => {
    const {id} = params;
    if (!id || !checkOid(id.toString()) || !request.hasBody) {
      response.status = 400;
      response.body = { error: "Invalid data" };
      return;
    }
    const task = await _Election.findOne({ _id: { $oid: id } });
    if (!task) {
      response.body = 404;
      response.body = { error: "Task not found" };
      return;
    }
    const {
      value: { toggle },
    } = await request.body();
    const req  = await _Election.updateOne({ _id: { $oid: id } }, { $set: { inProgress: toggle } });
    response.status = 201;
    response.body = { task: { id: req.$oid, ...task } };
};
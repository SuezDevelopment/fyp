// deno-lint-ignore-file no-explicit-any
import {_Election, _Candidate} from '../../model/electionShema.ts';
/**
 * Create a task
 * @param param0
 */
const checkOid = (oid: string) => {
  return new RegExp("^[0-9a-fA-F]{24}$").test(oid);
};

export const addCandidate = async ({
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
      response.body = { error: "Election not found" };
      return;
    }
    const {
      value: { candidate },
    } = await request.body();

    await _Candidate.updateOne({ _id: { $oid: id } }, { $set: { candidate: candidate } });
    response.status = 201;
};
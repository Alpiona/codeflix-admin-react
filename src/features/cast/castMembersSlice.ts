import { CastMember, CastMemberParams } from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: null
}

function parseQueryParams(params: CastMemberParams) {
  return null;
}

export const castMembersSlice = apiSlice.injectEndpoints({
  endpoints: () => null,
});
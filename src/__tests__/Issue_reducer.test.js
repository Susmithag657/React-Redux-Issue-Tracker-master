import reducer from "../redcuers/IssueReducer";
import * as types from "../actions/ActionTypes";
import initialState from "../Utils/IssueState";
describe("IssueReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it("should handle ADD_ISSUE", () => {
    const action = {
      type: types.ADD_ISSUE,
      payload: {}
    };
  });
});

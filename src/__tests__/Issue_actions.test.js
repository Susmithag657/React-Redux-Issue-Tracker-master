import configureStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as Actions from "../actions/ActionCreators";
import * as Types from "../actions/ActionTypes";
import thunk from "redux-thunk";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
//const store = mockStore({});

describe("Dispatches the correct actions and payload", () => {
  let props;
  const store = mockStore({
    loading: true,
    issues: [],
    filters: { status: "All", severity: "All", description: "" },
    visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
  });
  beforeEach(() => {
    props = {
      issues: [
        {
          description: "addIssue testing after modifying state",
          status: "Closed",
          severity: "Critical",
          dateCreated: "2021-03-05T18:30:00.000Z",
          dateResolved: "2021-03-18T18:16:19.000Z",
          id: "060ee225-9e42-4db5-bce7-7141aa06a49e"
        },
        {
          description: "this is new issue using Redux",
          severity: "Minor",
          status: "Closed",
          id: "1be35a13-81a5-4656-b502-2eae98a7bced",
          dateCreated: "2021-03-05T18:30:00.000Z",
          dateResolved: null
        }
      ]
    };
    store.clearActions();
  });
  it("dispatches LOAD_ISSUES_SUCCESS after successful API request", () => {
    mock.onGet("/issues").reply(200, props);
    store.dispatch(Actions.loadIssues()).then(() => {
      const expectedActions = [
        { type: Types.LOAD_ISSUES },
        { type: Types.LOAD_ISSUES_SUCCESS, payload: props }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Dispatches coorect actions and payload", () => {
  let props;
  const store = mockStore({
    loading: true,
    issues: [],
    filters: { status: "All", severity: "All", description: "" },
    visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
  });
  beforeEach(() => {
    props = {
      description: "testing addIssue",
      status: "Open",
      severity: "Critical",
      dateResolved: "2021-03-05T14:08:58.000Z",
      id: "fda4b408-4fac-4339-98a0-ebee2c2ad171",
      dateCreated: "2021-03-05T18:30:00.000Z"
    };
  });
  it("dispatches ADD_ISSUE_SUCCESS after successfull API request ", () => {
    mock.onPost("http://localhost:3004/issues").reply(201, props);
    store.dispatch(Actions.addIssue(props)).then(() =>
      expect(store.getActions()).toEqual([
        {
          type: Types.ADD_ISSUE,
          payload: props
        }
      ])
    );
  });
});

describe("dispatches correct actions and payloads", () => {
  let props;
  const store = mockStore();
  beforeEach(() => {
    props = 1;
  });
  it("dispatches DELETE_ISSUE_SUCCESS after successful API request", () => {
    mock.onDelete("issues/1").reply(200);
    store.dispatch(Actions.deleteIssue(1)).then(() => {
      expect(store.getActions()).toEqual({
        type: Types.DELETE_ISSUE_SUCCESS,
        payload: 1
      });
    });
  });
});

describe("dispatches correct actions and payloads", () => {
  let props;
  const store = mockStore();
  beforeEach(() => {
    props = {
      description: "testing update Issue after changing payload",
      status: "Closed",
      severity: "Critical",
      dateResolved: "2021-04-05T14:08:58.000Z",
      id: 1,
      dateCreated: "2021-06-05T18:30:00.000Z"
    };
  });
  it("dispatches UPDATE_ISSUE  after successful API request", () => {
    mock.onPut("issues/1").reply(200, { response: props });
    store.dispatch(Actions.updateIssue(1)).then(() => {
      expect(store.getActions(props)).toEqual({
        type: Types.UPDATE_ISSUE,
        payload: props
      });
    });
  });
});

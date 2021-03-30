import reducer from "../reducers/IssueReducer";
import * as types from "../actions/ActionTypes";
import * as states from "../Utils/IssueState";

describe("IssueReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(states.initialState, {})).toEqual(states.initialSate);
  });

  it("should handle LOAD_ISSUES", () => {
    const action = {
      type: types.LOAD_ISSUES
    };
    const expectedAction = {
      loading: true,
      issues: [],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(states.initialState, action)).toEqual(expectedAction);
  });

  it("should handle LOAD_ISSUES_SUCCESS", () => {
    const action = {
      type: types.LOAD_ISSUES_SUCCESS,
      payload: [...states.loadedState.issues]
    };
    const expectedAction = {
      loading: false,
      issues: [...states.loadedState.issues],
      allIssues: [...states.loadedState.issues],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(states.initialState, action)).toEqual(expectedAction);
  });

  it("should handle ADD_ISSUE", () => {
    const action = {
      type: types.ADD_ISSUE,
      payload: {
        description: "Testing Delete Issue",
        status: "Open",
        severity: "Critical",
        dateCreated: "2021-03-22T17:52:09.830Z",
        dateResolved: "2021-03-23T17:52:09.000Z",
        id: 1
      }
    };
    const expectedAction = {
      loading: true,
      issues: [action.payload],
      allIssues: [action.payload],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(states.initialState, action)).toEqual(expectedAction);
  });

  it("should handle UPDATE_ISSUE", () => {
    const state = {
      loading: true,
      issues: [...states.loadedState.issues],
      allIssues: [...states.loadedState.issues],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    const action = {
      type: types.UPDATE_ISSUE,
      payload: {
        description: "Testing Add Issue after updating",
        status: "Open",
        severity: "Major",
        dateCreated: "2021-03-22T17:52:09.830Z",
        dateResolved: "2021-03-23T17:52:09.000Z",
        id: 2
      }
    };
    const expectedAction = {
      loading: true,
      issues: states.loadedState.issues.map((issue) => {
        if (issue.id === action.payload.id) {
          issue = action.payload;
        }
        return issue;
      }),
      allIssues: states.loadedState.issues.map((issue) => {
        if (issue.id === action.payload.id) {
          issue = action.payload;
        }
        return issue;
      }),
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(state, action)).toEqual(expectedAction);
  });

  it("should handle DELLETE_ISSUE", () => {
    const state = {
      loading: true,
      issues: [...states.loadedState.issues],
      allIssues: [...states.loadedState.issues],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    const action = {
      type: types.DELETE_ISSUE,
      payload: 2
    };
    const expectedAction = {
      loading: true,
      issues: [
        {
          description: "Testing Delete Issue",
          status: "Open",
          severity: "Critical",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 1
        },
        {
          description: "Testing Update Issue",
          status: "In Progress",
          severity: "Major",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 3
        }
      ],
      allIssues: [
        {
          description: "Testing Delete Issue",
          status: "Open",
          severity: "Critical",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 1
        },
        {
          description: "Testing Update Issue",
          status: "In Progress",
          severity: "Major",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 3
        }
      ],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(state, action)).toEqual(expectedAction);
  });

  it("should handle multiple DELLETE_ISSUE", () => {
    const state = {
      loading: true,
      issues: [...states.loadedState.issues],
      allIssues: [...states.loadedState.issues],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    const action = {
      type: types.DELETE_ISSUE,
      payload: [2, 3]
    };
    const expectedAction = {
      loading: true,
      issues: [
        {
          description: "Testing Delete Issue",
          status: "Open",
          severity: "Critical",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 1
        }
      ],
      allIssues: [
        {
          description: "Testing Delete Issue",
          status: "Open",
          severity: "Critical",
          dateCreated: "2021-03-22T17:52:09.830Z",
          dateResolved: "2021-03-23T17:52:09.000Z",
          id: 1
        }
      ],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    expect(reducer(state, action)).toEqual(expectedAction);
  });
});

import * as Types from "../actions/ActionTypes";

const initialSate = {
  loading: true,
  issues: [],
  filters: { status: "All", severity: "All", description: "" },
  visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
};

const IssueReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.FILTER_BY_STATUS: {
      const value = action.payload;
      const filtered = value !== "All" ? state.allIssues.filter((issue) => issue.status === action.payload)
          : [...state.allIssues];
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, status: value }
      };
    }
    case Types.FILTER_BY_SEVERITY: {
      const value = action.payload;
      const filtered =
        value !== "All"
          ? state.allIssues.filter((issue) => issue.severity === action.payload)
          : [...state.allIssues];
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, severity: value }
      };
    }
    case Types.FILTER_BY_DESCRIPTION: {
      const value = action.payload;
      const filtered = value
        ? state.allIssues.filter((issue) =>
            issue.description.toLowerCase().includes(value.toLowerCase())
          )
        : [...state.allIssues];
      console.log("Inside Filter...");
      console.log(filtered);
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, description: value }
      };
    }
    case Types.SET_VISIBLE_FILTER: {
      const filters = action.payload;
      if (filters.length > 0) {
        return {
          ...state,
          issues: [...state.issues],
          filters: { ...state.filters },
          visibilityFilter: [...action.payload]
        };
      } else {
        return {
          ...state,
          issues: [...state.issues],
          filters: { ...state.filters },
          visibilityFilter: []
        };
      }
    }
    case Types.ADD_ISSUE: {
      return { ...state, issues: [...state.issues, action.payload], allIssues: [...state.issues, action.payload] };
    }
    case Types.DELETE_ISSUE: {
      let newState
     if(Array.isArray(action.payload) && action.payload.length){
       newState = state.allIssues.filter(
        (issue) => !action.payload.includes(issue.id)
      );
      } else {
         newState = state.allIssues.filter(
          (issue) => issue.id != action.payload
        );
      }
      
      return { ...state, issues: [...newState], allIssues : [...newState]};
    }
    case Types.UPDATE_ISSUE: {
     let issues =  state.issues.map(
        (issue) => {
          if(issue.id === action.payload.id){
            issue =  action.payload
          }
          return issue
        });
       let allIssues = state.allIssues.map(
          (issue) => {
            if(issue.id === action.payload.id){
              issue =  action.payload
            }
            return issue
          });
      return { ...state, issues: issues, allIssues: allIssues };
    }
    case Types.LOAD_ISSUES: {
      return { ...state, loading: true };
    }
    case Types.LOAD_ISSUES_SUCCESS: {
      return { ...state, allIssues:action.payload ,issues: action.payload, loading: false };
    }
    default:
      return state;
  }
};
export default IssueReducer;
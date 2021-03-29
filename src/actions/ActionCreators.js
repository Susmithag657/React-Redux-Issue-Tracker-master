import * as Types from "./ActionTypes";
import IssueApi from "../data/IssueApi";
import UserApi from "../data/UserApi";

//-------------------Messages---------------------------------

export const setMessage = (message) => ({
  type: Types.SET_MESSAGE,
  payload: message
});
export const clearMessage = (message) => ({ type: Types.CLEAR_MESSAGE });

//-------------------------User--------------------------------
// export function signUp(user) {
//   return { type: Types.USER_SIGNUP, payload: user };
// }
export function signUpSuccess(user) {
  return { type: Types.USER_SIGNUP_SUCCESS, payload: user };
}
export function signUpFail(error) {
  return { type: Types.USER_SIGNUP_FAIL, payload: error };
}
// export function login(user) {
//   return { type: Types.USER_LOGIN_LOADING, payload: user };
// }
export function loginSuccess(user) {
  return { type: Types.USER_LOGIN_SUCCESS, payload: user };
}
export function loginFail(error) {
  return { type: Types.USER_LOGIN_FAIL, payload: error };
}
export function logOutUser() {
  return { type: Types.USER_LOGOUT };
}
export function formSubmittionStatus(status) {
  return {
    type: Types.FORM_SUBMITION_STATUS,
    payload: { status }
  };
}

export function addUser(user) {
  return async function (dispatch, getState) {
    // dispatch(signUp(user));
    try {
      const response = await UserApi.register(user);
      console.log("Inside addUser action..");
      console.log(response);
      dispatch(signUpSuccess(response.data));
      dispatch(setMessage("Signup successfull"));
    } catch (error) {
      dispatch(signUpFail(error.toString()));
      dispatch(setMessage("Sign up Failed"));
    }
  };
}
// export function loginSimilarUser(user) {
//   return async function (dispatch, getState) {
//     // dispatch(login(user));
//     try {
//       const data = await UserApi.getSimilarUser(user.email);
//       console.log(data);
//       if (data.length > 0) {
//         data[0].password == user.password
//           ? dispatch(loginSuccess(user))
//           : dispatch(loginFail(user));
//       } else {
//       }
//     } catch (error) {
//       throw error;
//     }
//   };
// }

export function loginUser(user) {
  return async function (dispatch, getState) {
    try {
      const response = await UserApi.login(user);
      console.log(response);
      if (response.data.length) {
        dispatch(loginSuccess(response.data[0]));
        dispatch(setMessage("Login Success!"));
        return response.data;
      } else {
        dispatch(loginFail("login Failed!"));
      }
    } catch (error) {
      throw error;
    }
  };
}
//-----------------------------Issues--------------------------------

export function loadIssuesLoading(issues) {
  return { type: Types.LOAD_ISSUES };
}
export function loadIssuesSuccess(issues) {
  return { type: Types.LOAD_ISSUES_SUCCESS, payload: issues };
}
export function addIssueSuccess(issue) {
  return { type: Types.ADD_ISSUE, payload: issue };
}
export function updateIssueSuccess(issue) {
  return {
    type: Types.UPDATE_ISSUE,
    payload: issue
  };
}
export function deleteIssueSuccess(id) {
  return { type: Types.DELETE_ISSUE, payload: id };
}
export function filterIssuesByStatus(status) {
  return { type: Types.FILTER_BY_STATUS, payload: status };
}
export function filterIssuesBySeverity(severity) {
  return { type: Types.FILTER_BY_SEVERITY, payload: severity };
}
export function filterIssuesByDescription(data) {
  return { type: Types.FILTER_BY_DESCRIPTION, payload: data };
}
export function setVisibilityFilter(filter) {
  return { type: Types.SET_VISIBLE_FILTER, payload: filter };
}
export function addIssue(issue) {
  return async function (dispatch, getState) {
    try {
      const issues = await IssueApi.saveIssue(issue);
      console.log("Inside dispatch:" + issues);
      dispatch(addIssueSuccess(issues));
    } catch (error) {
      throw error;
    }
  };
}

export function updateIssue(issue) {
  return async function (dispatch, getState) {
    try {
      const issues = await IssueApi.editIssue(issue);
      console.log("Inside Action creator..");
      console.log(issues);
      dispatch(updateIssueSuccess(issues));
      return issues;
    }
    catch(error){
      throw error;
    };
  };
}
export function deleteIssue(id) {
  return async function (dispatch, getState) {
    try {
      if(Array.isArray(id) && id.length){
       await Promise.all(id.map((async (ele )=>  await IssueApi.deleteIssue(ele) )));
      } else if(!Array.isArray(id)){
        await IssueApi.deleteIssue(id);
      }
    
      dispatch(deleteIssueSuccess(id));
    } catch (error) {
      throw error;
    }
  };
}
export function loadIssue(id) {
  return function (dispatch, getState) {
    return IssueApi.getIssue(id).then((issue) => {
      dispatch({ type: Types.LOAD_ISSUE, payload: issue });
      return issue;
    });
  };
}

export function loadIssues(issues) {
  return function (dispatch) {
    dispatch(loadIssuesLoading());
    return IssueApi.getAllIssues(issues)
      .then((issues) => {
        dispatch(loadIssuesSuccess(issues));
      })
      .catch((error) => {
        throw error;
      });
  };
}
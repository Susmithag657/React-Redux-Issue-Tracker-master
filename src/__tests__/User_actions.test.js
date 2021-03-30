import configureStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as Actions from "../actions/ActionCreators";
import * as Types from "../actions/ActionTypes";
import thunk from "redux-thunk";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Dispatches the correct actions and payload", () => {
  let props;
  let message;
  const store = mockStore({});
  beforeEach(() => {
    props = {
      email: "abc@xyz.com",
      firstName: "abc",
      lastName: "xyz",
      mobileNumber: "2434546778869",
      password: "abc@#!Qfdffd",
      confirmPassword: "abc@#!Qfdffd"
    };
    message = "Sign Up success";
    store.clearActions();
  });
  it("dispatches USER_SIGNUP_SUCCESS after successful signup", () => {
    mock.onPost("http://localhost:3004/users").reply(201, {
      props
    });
    store.dispatch(Actions.addUser()).then(() => {
      const expectedActions = [
        { type: Types.USER_SIGNUP_SUCCESS, payload: [props] },
        { type: Types.SET_MESSAGE, payload: message }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Dispatches the correct actions and payload", () => {
  let props;
  let message;
  let response;
  const store = mockStore({});
  beforeEach(() => {
    props = {
      email: "abc@xyz.com",
      password: "abc@#!Qfdffd"
    };
    response = {
      email: "abc@xyz.com",
      firstName: "abc",
      lastName: "xyz",
      mobileNumber: "2434546778869",
      password: "abc@#!Qfdffd",
      confirmPassword: "abc@#!Qfdffd"
    };

    message = "Login success";
    store.clearActions();
  });
  it("dispatches USER_LOGIN_SUCCESS after successful signup", () => {
    mock
      .onGet(
        `http://localhost:3004/users/?email=${props.email}&password=${props.password}`
      )
      .reply(201, response);
    store.dispatch(Actions.loginUser(props)).then(() => {
      const expectedActions = [
        { type: Types.USER_LOGIN_SUCCESS, payload: [props] },
        { type: Types.SET_MESSAGE, payload: message }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Dispatches the correct actions and payload", () => {
  let props;
  let message;
  let response;
  const store = mockStore({});
  beforeEach(() => {
    props = {
      email: "abc@xyz.com",
      password: "@#!Qfdffd"
    };
    response = {};

    message = "Login Failed";
    store.clearActions();
  });
  it("dispatches USER_LOGIN_FAIL after successful signup", () => {
    mock
      .onGet(
        `http://localhost:3004/users/?email=${props.email}&password=${props.password}`
      )
      .reply(201, response);
    store.dispatch(Actions.loginUser(props)).then(() => {
      const expectedActions = [
        { type: Types.USER_LOGIN_FAIL, payload: [props] },
        { type: Types.SET_MESSAGE, payload: message }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Dispatches the correct actions and payload", () => {
  const store = mockStore({});
  beforeEach(() => {
    store.clearActions();
  });
  it("dispatches USER_LOGIN_FAIL after successful signup", () => {
    store.dispatch(Actions.logOutUser());
    const expectedActions = [{ type: Types.USER_LOGOUT }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

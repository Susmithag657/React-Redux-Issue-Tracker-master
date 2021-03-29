import * as Types from "../actions/ActionTypes";
const initialState = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    location: "",
    password: ""
  },
  isLoggedIn: false,
  message:'',
  error:''
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case Types.USER_LOGIN_SUCCESS: {
      return { ...state, profile: { ...action.payload }, isLoggedIn: true };
    }
    case Types.USER_LOGIN_FAIL: {
      return { ...state, profile:{...initialState.profile},isLoggedIn: false,message:action.payload };
    }
  
    case Types.USER_SIGNUP_SUCCESS: {
      return { ...state, profile: { ...action.payload }, isLoggedIn: true };
    }
    case Types.USER_SIGNUP_FAIL: {
      return { ...state, profile: {...initialState.profile}, isLoggedIn: false,error:action.payload };
    }
    case Types.USER_LOGOUT: {
      return { ...state, profile: {...initialState.profile}, isLoggedIn: false,message:'' };
    }
   case Types.SET_MESSAGE:{
     return {...state,profile:{...state.profile},message:action.payload}
   }
    default:
      return state;
  }
};

export default UserReducer;

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from "../reducers/UserReducer";
import IssueReducer from "../reducers/IssueReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  user: UserReducer,
  issues: IssueReducer
});
const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
export default configureStore;

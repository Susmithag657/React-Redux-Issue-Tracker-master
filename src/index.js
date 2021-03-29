import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/UserStore";

import App from "./App";
import { loadIssues } from "./actions/ActionCreators";

const store = configureStore();
store.dispatch(loadIssues());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("newa")
);

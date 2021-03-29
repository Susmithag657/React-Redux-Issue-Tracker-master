import "./styles.css";
import { Suspense, lazy } from "react";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import NavBar from "./components/layouts/NavBar";
import PrivateRoute from "./components/layouts/PrivateRoute";
import AddIssue from "./components/Issues/AddIssue";
import Issue from "./components/Issues/Issue";
import UpdateIssue from "./components/Issues/UpdateIssue";
import LoginPage from "./components/users/LoginPage";
import SignUpForm from "./components/users/SignUpForm";
import ViewIssue from "./components/Issues/ViewIssue";
import updateIssuetwo from "./components/Issues/updateIssuetwo";
import User from "./components/users/user";
import Loading from "./components/pages/Loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
const Issues = lazy(() => import("./components/pages/Issues"));

const App = ({ isLoggedIn }) => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/issues" component={Issues} />
            <PrivateRoute
              exact
              path="/issues/:id"
              isLoggedIn={isLoggedIn}
              component={ViewIssue}
            />
            <PrivateRoute
              path="/addIssue"
              isLoggedIn={isLoggedIn}
              component={AddIssue}
            />
            <PrivateRoute
              path="/updateIssue/:id"
              isLoggedIn={isLoggedIn}
              component={UpdateIssue}
            />
            <PrivateRoute
              path="/viewIssue"
              isLoggedIn={isLoggedIn}
              component={Issue}
            />
            <PrivateRoute
              path="/updateIssuetwo/:id"
              isLoggedIn={isLoggedIn}
              component={updateIssuetwo}
            />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute
              path="/user"
              isLoggedIn={isLoggedIn}
              component={User}
            />
            <Route path="/" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};
export default connect(mapStateToProps, null)(App);

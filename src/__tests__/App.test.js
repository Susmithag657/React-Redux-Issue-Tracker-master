import App from "../App";
import { shallow } from "enzyme";
import { findByTestAttr } from "../Utils/utils";
import configureStore from "redux-mock-store";
import * as state from "../Utils/IssueState";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const setUp = (initialState = {}) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<App store={store} />);
  return wrapper;
};
describe("App Component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      loading: true,
      issues: [...state.loadedState.issues],
      allIssues: [...state.loadedState.issues],
      filters: { status: "All", severity: "All", description: "" },
      visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
    };
    wrapper = setUp(initialState);
  });
  it("Should render", () => {
    const component = findByTestAttr(wrapper, "AppComponent");
    expect(component.length).toBe(1);
  });
  it("Component Snapshot", () => {
    const component = findByTestAttr(wrapper, "AppComponent");
    expect(component).toMatchSnapshot();
  });
});

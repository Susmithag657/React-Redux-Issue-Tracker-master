import { Issues } from "../components/pages/Issues";
import { shallow } from "enzyme";
import * as state from "../Utils/IssueState";
describe("Issue Component", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      issues: [...state.loadedState.issues],
      visibleFilters: [...state.loadedState.visibilityFilter],
      sortByFilters: { status: "All", severity: "All", description: "" },
      filterIssuesByDescription: jest.fn(),
      filterIssuesBySeverity: jest.fn(),
      filterIssuesByStatus: jest.fn(),
      setVisibilityFilter: jest.fn(),
      deleteIssue: jest.fn()
    };
    wrapper = shallow(<Issues {...props} />);
  });
  it("Should render correctly", () => {
    expect(wrapper.length).toBe(1);
  });
  it("Should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

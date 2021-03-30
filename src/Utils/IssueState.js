export const initialSate = {
  loading: true,
  issues: [],
  filters: { status: "All", severity: "All", description: "" },
  visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
};

export const loadedState = {
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
      description: "Testing Add Issue",
      status: "Closed",
      severity: "Minor",
      dateCreated: "2021-03-22T17:52:09.830Z",
      dateResolved: "2021-03-23T17:52:09.000Z",
      id: 2
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

export const updatedState = [
  {
    description: "Testing Delete Issue",
    status: "Open",
    severity: "Critical",
    dateCreated: "2021-03-22T17:52:09.830Z",
    dateResolved: "2021-03-23T17:52:09.000Z",
    id: 1
  },
  {
    description: "Testing Add Issue after updating",
    status: "Open",
    severity: "Major",
    dateCreated: "2021-03-22T17:52:09.830Z",
    dateResolved: "2021-03-23T17:52:09.000Z",
    id: 2
  },
  {
    description: "Testing Update Issue",
    status: "In Progress",
    severity: "Major",
    dateCreated: "2021-03-22T17:52:09.830Z",
    dateResolved: "2021-03-23T17:52:09.000Z",
    id: 3
  }
];

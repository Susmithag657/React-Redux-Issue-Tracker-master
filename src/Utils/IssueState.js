export const initialSate = {
  loading: true,
  issues: [],
  filters: { status: "All", severity: "All", description: "" },
  visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
};

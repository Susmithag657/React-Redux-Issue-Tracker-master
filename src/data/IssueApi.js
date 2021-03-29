import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class IssueApi {
  static async getAllIssues() {
    const res = await axios.get("http://localhost:3004/issues");
    return res.data;
  }
  static async getIssue(id) {
    const res = await axios.get(`http://localhost:3004/issues/${id}`);
    return res.data;
  }
  static async saveIssue(issue) {
    issue.id = uuidv4();
    const res = await axios.post("http://localhost:3004/issues", issue);
    console.log(res.data);
    return res.data;
  }
  static async editIssue(issue) {
    const res = await axios.put(
      `http://localhost:3004/issues/${issue.id}`,
      issue
    );
    console.log(res.data);
    return res.data;
  }

  static deleteIssue(id) {
    return axios.delete("http://localhost:3004/issues/" + id);
  }

  static deleteMultiple(id) {
    return axios.delete("http://localhost:3004/issues/" + id)
  }
}
  


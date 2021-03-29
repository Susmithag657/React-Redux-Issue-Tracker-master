import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class userApi {
  static async getAllUsers() {
    const res = await axios.get("http://localhost:3004/users");
    return res.data;
  }
  // static async getSimilarUser(email) {
  //   const res = await axios.get(
  //     `http://localhost:3005/users/?limit=1&email=${email}`
  //   );
  //   console.log("in User Api:" + res.data);
  //   return res.data;
  // }
  static async register(user) {
    user.id = uuidv4();
    const res = await axios.post("http://localhost:3004/users", user);
    console.log("in User Api:" + res.data);
    return res;
  }
  static async login(user) {
  const {email,password}=user;
  const encodedPassword = encodeURIComponent(password)
    const res = await axios.get(
      `http://localhost:3004/users/?email=${email}&password=${encodedPassword}`
    );
    return res;
  }
  static async editUser(user) {
    const res = await axios.put("http://localhost:3004/users/", user);
    return res.data;
  }
}

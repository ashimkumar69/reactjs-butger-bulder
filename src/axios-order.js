import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-c6671.firebaseio.com",
});

export default instance;

import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (res) => res;
  const onError = (err) => {
    // optional catch error and logic
    return err;
  };
  return client(options).then(onSuccess).catch(onError);
};

import axios from "axios";

const endpoint = import.meta.env.VITE_API_ENDPOINT_URL || "";

const http = axios.create({
  baseURL: endpoint,
});

export class HttpService {
  static async get(url: string) {
    return await http.get(url).then((res) => res.data);
  }

  static async post(url: string, body: any = {}) {
    return await http.post(url, body).then((res) => res.data);
  }
}

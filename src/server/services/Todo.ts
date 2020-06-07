import Axios from "axios";
import { read, create } from "./utils";

export default class Todo {
  name: string;
  axios: any;
  pathname: string;

  constructor(config: any) {
    this.name = "todo";
    this.axios = Axios.create(config.agreed.config.axios);
    this.pathname = "todo";
  }

  read(req: any, resource: any, params: any = {}, config: any) {
    return read(this.axios, this.name, this.pathname, params, {});
  }

  //   create(req: any, resource: any, params: any, body?: any, config?: any) {
  //     return create(this.axios, this.name, this.pathname, body, params, {});
  //   }
}

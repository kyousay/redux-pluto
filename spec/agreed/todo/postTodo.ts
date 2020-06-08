import { APIDef, POST, Success201, ResponseDef } from "agreed-typed";

export type PostTodoAPI = APIDef<
  POST,
  ["todo"],
  {},
  {},
  {
    content: string;
  },
  {},
  ResponseDef<
    Success201,
    {
      id: string;
      content: string;
      checked: boolean;
      name: string;
    }
  >
>;

const api: PostTodoAPI = {
  request: {
    path: ["todo"],
    method: "POST",
    body: {
      content: "{:content}",
    },
    values: {
      content: "todo",
    },
  },
  response: {
    status: 201,
    body: {
      id: "{randomString: id}",
      content: "{:content}",
      checked: false,
      name: "{randomString: id}",
    },
  },
};

module.exports = api;

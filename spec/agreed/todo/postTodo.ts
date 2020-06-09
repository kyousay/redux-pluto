import { APIDef, POST, Success201, ResponseDef } from "agreed-typed";

export type PostTodoAPI = APIDef<
  POST,
  ["todo"],
  {},
  {},
  {
    content: string;
    postID: string;
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
      postID: "{:postID}",
    },
  },
  response: {
    status: 201,
    body: {
      id: "{:postID}",
      content: "{:content}",
      checked: false,
      name: "{:postID}",
    },
  },
};

module.exports = api;

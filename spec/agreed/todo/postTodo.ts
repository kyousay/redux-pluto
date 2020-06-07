import { APIDef, POST, Success201, ResponseDef } from "agreed-typed";

export type PostTodoAPI = APIDef<
  POST,
  ["todo"],
  {},
  {},
  {
    todo: {
      id: string;
      content: string;
      checked: boolean;
      name: string;
      index: number;
    };
  },
  {},
  ResponseDef<
    Success201,
    {
      todo: {
        id: string;
        content: string;
        checked: boolean;
        name: string;
        index: number;
      };
    }
  >
>;

const api: PostTodoAPI = {
  request: {
    path: ["todo"],
    method: "POST",
    body: {
      todo: {
        id: "{:id}",
        content: "{:content}",
        checked: "{:checked}",
        name: "{:name}",
        index: "{:index}",
      },
    },
    values: {
      todo: {
        id: "{:id}",
        content: "{:content}",
        checked: "{:checked}",
        name: "{:name}",
        index: "{:index}",
      },
    },
  },
  response: {
    status: 201,
    body: {
      todo: {
        id: "{:id}",
        content: "{:content}",
        checked: "{:checked}",
        name: "{:name}",
        index: "{:index}",
      },
    },
  },
};

module.exports = api;

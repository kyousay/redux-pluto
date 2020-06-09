import { APIDef, GET, Success200, ResponseDef } from "agreed-typed";

export type TodosGetAPI = APIDef<
  GET,
  ["todo"],
  {},
  {},
  undefined,
  {},
  ResponseDef<
    Success200,
    {
      results: {
        todos: {
          id: string;
          content: string;
          checked: boolean;
          name: string;
        }[];
      };
    }
  >
>;

const api: TodosGetAPI = {
  request: {
    path: ["todo"],
    method: "GET",
    body: null,
  },
  response: {
    status: 200,
    body: {
      results: {
        todos: [
          {
            id: "todo01",
            content: "hello",
            checked: true,
            name: "todo01",
          },
          {
            id: "todo02",
            content: "world",
            checked: false,
            name: "todo02",
          },
        ],
      },
    },
  },
};

module.exports = api;

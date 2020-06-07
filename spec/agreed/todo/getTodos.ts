import { APIDef, GET, Success200, ResponseDef, Error404 } from "agreed-typed";

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
          index: number;
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
            name: "hello",
            index: 0,
          },
          {
            id: "todo02",
            content: "world",
            checked: false,
            name: "world",
            index: 1,
          },
        ],
      },
    },
  },
};

module.exports = api;

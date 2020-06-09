import * as assert from "power-assert";
import configs from "../../configs";
import Todo from "../Todo";

const getTodos = require("../../../../spec/agreed/todo/getTodos");

test("Todo: read success", async () => {
  const todo = new Todo(configs);
  const result = await (todo.read as any)({}, {}, {});
  assert.deepEqual(result, getTodos.response.body.results);
});

import * as assert from "power-assert";
import configs from "../../configs";
import Todo from "../Todo";

test("Todo: create success", async () => {
  const todo = new Todo(configs);
  const body = { content: "hello", postID: "todo03" };
  const result = await todo.create({}, {}, {}, body, {});
  assert.ok(result.id);
  assert.equal(result.content, body.content);
});

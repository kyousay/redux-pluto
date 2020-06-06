import * as assert from "power-assert";
import configs from "../../configs";
import Hello from "../Hello";

test("Hello: create success", async () => {
  const hello = new Hello(configs);
  const body = { text: "hello" };
  const result = await hello.create({}, {}, {}, body, {});
  assert.ok(result.id);
  assert.equal(result.text, body.text);
});

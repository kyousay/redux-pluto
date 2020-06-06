import * as assert from "power-assert";
import configs from "../../configs";
import Hello from "../Hello";

const getComments = require("../../../../spec/agreed/hello/getComments");

test("Hello: read success", async () => {
  const hello = new Hello(configs);
  const result = await (hello.read as any)({}, {}, {});
  assert.deepEqual(result, getComments.response.body.results);
});

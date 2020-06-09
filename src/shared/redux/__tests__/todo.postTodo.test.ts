import * as Fetchr from "fetchr";
import * as assert from "power-assert";
import { FetchrStatic } from "./types";
import { postTodo, INITIAL_STATE } from "../modules/todo";
import { createStore } from "./lib/storeUtils";

let needFailure: any = null;

const todo = {
  id: "todo00",
  content: "hello",
  checked: false,
  name: "todo00",
};

(Fetchr as FetchrStatic).registerService({
  name: "todo",
  create(req, resource, params, body, config, cb) {
    return needFailure
      ? cb(new Error("failure"))
      : cb(needFailure, {
          ...todo,
        });
  },
});

test("Todo: postTodo success", async () => {
  const store = createStore({ cookie: {} });

  assert.deepEqual(store.getState().app.todo, INITIAL_STATE);
  const body = { postID: "todo00", content: "hello" };
  await store.dispatch(postTodo(body));
  assert.deepEqual(store.getState().app.todo, {
    todos: [{ ...todo }],
    loaded: true,
    loading: false,
  });
});

test("Todo: postTodo failure", async done => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.todo, INITIAL_STATE);
  const body = { postID: "todo00", content: "hello" };
  try {
    await store.dispatch(postTodo(body));
  } catch (_e) {
    assert.deepEqual(store.getState().app.todo, {
      todos: [],
      error: true,
      loading: false,
      loaded: false,
    });
    done();
  }
});

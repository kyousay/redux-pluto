import * as Fetchr from "fetchr";
import * as assert from "power-assert";
import { FetchrStatic } from "./types";
import { getTodos, INITIAL_STATE } from "../modules/todo";
import { createStore } from "./lib/storeUtils";

let needFailure: any = null;

const todos = [
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
];

(Fetchr as FetchrStatic).registerService({
  name: "todo",
  read(req, resource, params, config, cb) {
    return needFailure ? cb(new Error("failure")) : cb(needFailure, { todos });
  },
});

test("Todo: getTodos success", async () => {
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.todo, INITIAL_STATE);

  await store.dispatch(getTodos());

  assert.deepEqual(store.getState().app.todo, {
    todos,
    loaded: true,
    loading: false,
  });
});

test("Todo: getTodos failure", async done => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.todo, INITIAL_STATE);
  try {
    await store.dispatch(getTodos());
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

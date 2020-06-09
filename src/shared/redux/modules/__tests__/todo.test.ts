import * as assert from "power-assert";
// import Immutable from "seamless-immutable";
import reducer, { changeChecked } from "../todo";

test("State: changeChecked", done => {
  let changeCheckedAction = changeChecked(0, false);
  const INITIAL_STATE = {
    todos: [
      {
        id: "todo01",
        content: "hello",
        checked: false,
        name: "todo01",
      },
    ],
    loading: true,
    loaded: false,
  };
  let state = reducer(INITIAL_STATE as any, changeCheckedAction as any);
  assert.deepEqual(state, {
    todos: [
      {
        id: "todo01",
        content: "hello",
        checked: true,
        name: "todo01",
      },
    ],
    loading: true,
    loaded: false,
  });

  changeCheckedAction = changeChecked(0, true);
  state = reducer(INITIAL_STATE as any, changeCheckedAction as any);
  assert.deepEqual(state, {
    todos: [
      {
        id: "todo01",
        content: "hello",
        checked: false,
        name: "todo01",
      },
    ],
    loading: true,
    loaded: false,
  });
  done();
});

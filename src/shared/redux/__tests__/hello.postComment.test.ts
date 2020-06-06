import * as Fetchr from "fetchr";
import * as assert from "power-assert";
import { FetchrStatic } from "./types";
import { postComment, INITIAL_STATE } from "../modules/hello"; // ｐｏｓｔComment と INITIAL_STATE をインポート
import { createStore } from "./lib/storeUtils";

let needFailure: any = null;

(Fetchr as FetchrStatic).registerService({
  name: "hello",
  create(req, resource, params, body, config, cb) {
    return needFailure
      ? cb(new Error("failure"))
      : // リクエスト成功時には送られてきたテキストに id を採番したオブジェクトを返す
        cb(needFailure, { id: "0001", text: body.text });
  },
});

test("hello: postComment success", async () => {
  const store = createStore({ cookie: {} });

  assert.deepEqual(store.getState().app.hello, INITIAL_STATE);
  const body = { text: "hello" };
  await store.dispatch(postComment(body));
  assert.deepEqual(store.getState().app.hello, {
    comments: [{ id: "0001", text: body.text }],
    isVisible: true,
    loaded: true,
    loading: false,
  });
});

test("hello: postComments failure", async done => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.hello, INITIAL_STATE);
  const body = { text: "hello" };
  try {
    await store.dispatch(postComment(body));
  } catch (_e) {
    assert.deepEqual(store.getState().app.hello, {
      comments: [],
      isVisible: true,
      error: true,
      loading: false,
      loaded: false,
    });
    done();
  }
});

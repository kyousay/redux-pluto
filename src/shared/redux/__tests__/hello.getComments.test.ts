import * as Fetchr from "fetchr"; // Fetcher の インポート
import * as assert from "power-assert";
import { FetchrStatic } from "./types";
import { getComments, INITIAL_STATE } from "../modules/hello";
import { createStore } from "./lib/storeUtils"; // store 作成のための util

let needFailure: any = null; // リクエストを失敗させるかどうかのフラグ

const comments = [{ id: "0001", text: "hello" }]; // API からの レスポンスデータ

(Fetchr as FetchrStatic).registerService({
  // reducer の中では Fetcher を利用して api 呼び出しを行っているため、Fetcher の登録を行う
  name: "hello",
  read(req, resource, params, config, cb) {
    return needFailure
      ? cb(new Error("failure")) // リクエスト失敗フラグが true の時には error を返す
      : cb(needFailure, { comments }); // リクエスト失敗フラグが false の時には comments を返す
  },
});

test("hello: getComments success", async () => {
  // リクエスト成功時のテスト
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.hello, INITIAL_STATE); // 初期状態であることを確認

  await store.dispatch(getComments());

  // getComments を dispatch
  assert.deepEqual(store.getState().app.hello, {
    // state が 想定どうりに更新されているか確認
    comments,
    isVisible: true,
    loaded: true,
    loading: false,
  });
});

test("hello: getComments failure", async done => {
  needFailure = true; // リクエスト失敗フラグを立てる
  const store = createStore({ cookie: {} });
  assert.deepEqual(store.getState().app.hello, INITIAL_STATE);
  try {
    await store.dispatch(getComments());
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

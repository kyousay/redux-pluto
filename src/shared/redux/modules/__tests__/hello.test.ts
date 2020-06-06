import * as assert from "power-assert";
import Immutable from "seamless-immutable";
import reducer, { changeVisibility } from "../hello"; // reducer と テストしたい関数（changeVisibility） をインポート

test("State: changeVisibility", done => {
  const changeVisibilityAction = changeVisibility();
  const INITIAL_STATE = Immutable({
    // INITIAL_STATE を イミュータブルなオブジェクトとして設定
    isVisible: false,
    comments: [],
    loading: true,
    loaded: false,
  });
  let state = reducer(INITIAL_STATE as any, changeVisibilityAction as any);
  // 設定した初期値に対して changeVisibilityAction を発火
  assert.deepEqual(state, {
    isVisible: true,
    comments: [],
    loading: true,
    loaded: false,
  });

  // isVisible が true の状態でもう一度　changeVisibilityAction を発火
  state = reducer(state, changeVisibilityAction as any);
  assert.deepEqual(state, {
    isVisible: false,
    comments: [],
    loading: true,
    loaded: false,
  });
  done();
});

import { Props as TodoItemProps } from "../../../shared/components/atoms/TodoItem";
import { steps } from "redux-effects-steps";
import { fetchrRead, fetchrCreate } from "redux-effects-fetchr";

/**
 * Action types
 */

const TODO_CHANGE_CHECKED = "redux-pluto/todo/checked/change";
const TODO_GET_TODOS_REQUEST = "redux-pluto/todo/get/todos/request";
const TODO_GET_TODOS_SUCCESS = "redux-pluto/todo/get/todos/success";
const TODO_GET_TODOS_FAIL = "redux-pluto/todo/get/todos/fail";
const TODO_POST_TODO_REQUEST = "redux-pluto/todo/post/todo/request";
const TODO_POST_TODO_SUCCESS = "redux-pluto/todo/post/todo/success";
const TODO_POST_TODO_FAIL = "redux-pluto/todo/post/todo/fail";

type CHANGE_CHECKED = {
  type: typeof TODO_CHANGE_CHECKED;
  payload: {
    index: number;
    checked: boolean;
  };
};

type TodosRequest = {
  type: typeof TODO_GET_TODOS_REQUEST;
  payload: {
    resource: string;
  };
};

type TodosSuccess = {
  type: typeof TODO_GET_TODOS_SUCCESS;
  payload: any;
};

type TodosFail = {
  type: typeof TODO_GET_TODOS_FAIL;
  error: boolean;
};

type PostTodoRequest = {
  type: typeof TODO_POST_TODO_REQUEST;
  payload: {
    resource: string;
    body: {
      content: string;
    };
  };
};

type PostTodoSuccess = {
  type: typeof TODO_POST_TODO_SUCCESS;
  payload: {
    data: {
      id: string;
      content: string;
      checked: boolean;
      name: string;
    };
  };
};

type PostTodoFail = {
  type: typeof TODO_POST_TODO_FAIL;
  error: boolean;
};

type Action =
  | CHANGE_CHECKED
  | TodosRequest
  | TodosSuccess
  | TodosFail
  | PostTodoRequest
  | PostTodoSuccess
  | PostTodoFail;

/**
 * Action creators
 */

export function changeChecked(index: number, checked: boolean) {
  return {
    type: TODO_CHANGE_CHECKED,
    payload: {
      index,
      checked: !checked,
    },
  };
}

export function getTodosRequest(payload: { resource: string }): TodosRequest {
  return {
    type: TODO_GET_TODOS_REQUEST,
    payload,
  };
}

export function getTodosSuccess(res: any) {
  return {
    type: TODO_GET_TODOS_SUCCESS,
    payload: res,
  };
}

export function getTodosFail() {
  return {
    type: TODO_GET_TODOS_FAIL,
    error: true,
  };
}

export function getTodos() {
  return steps(
    getTodosRequest({ resource: "todo" }),
    ({ payload }) => fetchrRead(payload),
    [getTodosSuccess, getTodosFail],
  );
}

export function PostTodoRequest(payload: {
  resource: string;
  body: { content: string };
}): PostTodoRequest {
  return {
    type: TODO_POST_TODO_REQUEST,
    payload,
  };
}

export function PostTodoSuccess(payload: {
  data: {
    id: string;
    content: string;
    checked: boolean;
    name: string;
  };
}): PostTodoSuccess {
  return {
    type: TODO_POST_TODO_SUCCESS,
    payload,
  };
}

export function PostTodoFail(): PostTodoFail {
  return {
    type: TODO_POST_TODO_FAIL,
    error: true,
  };
}

export function postTodo(body: { content: string }) {
  return steps(
    PostTodoRequest({ resource: "todo", body }),
    ({ payload }) => fetchrCreate(payload),
    [PostTodoSuccess, PostTodoFail],
  );
}

/**
 * Initial state
 */

export type State = {
  todos: Omit<TodoItemProps, "onChangeHandler">[];
  loading: boolean;
  loaded: boolean;
  error?: boolean;
};

const INITIAL_STATE = {
  todos: [],
  loading: true,
  loaded: false,
};

/**
 * Reducer
 */

export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case TODO_CHANGE_CHECKED: {
      const newTodos = [...state.todos];
      newTodos[action.payload.index].checked = action.payload.checked;
      return {
        ...state,
        todos: newTodos,
      };
    }
    case TODO_GET_TODOS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case TODO_GET_TODOS_SUCCESS: {
      const {
        payload: {
          data: { todos },
        },
      } = action;
      return {
        ...state,
        todos,
        loading: false,
        loaded: true,
      };
    }
    case TODO_GET_TODOS_FAIL: {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    }
    case TODO_POST_TODO_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case TODO_POST_TODO_SUCCESS: {
      const {
        data: { id, content, name, checked, index },
      } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, content, name, checked, index }],
        loading: false,
        loaded: true,
      };
    }
    case TODO_POST_TODO_FAIL: {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    }
    default: {
      return state;
    }
  }
}

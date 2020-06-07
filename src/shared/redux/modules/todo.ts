import { Props as TodoItemProps } from "../../../shared/components/atoms/TodoItem";

/**
 * Action types
 */

const TODO_CHANGE_CHECKED = "redux-pluto/todo/checked/change";

type CHANGE_CHECKED = {
  type: typeof TODO_CHANGE_CHECKED;
  payload: {
    index: number;
    checked: boolean;
  };
};

type Action = CHANGE_CHECKED;

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

/**
 * Initial state
 */

export type State = {
  todos: Omit<TodoItemProps, "onChangeHandler">[];
};

const INITIAL_STATE = {
  todos: [
    {
      id: "todo01",
      content: "hello",
      checked: true,
      name: "hello",
      index: 0,
    },
    {
      id: "todo02",
      content: "world",
      checked: false,
      name: "world",
      index: 1,
    },
  ],
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
    default: {
      return state;
    }
  }
}

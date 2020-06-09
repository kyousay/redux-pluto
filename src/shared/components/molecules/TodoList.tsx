import React from "react";
import TodoItem, { Props as TodoItemProps } from "../atoms/TodoItem";

type Props = {
  todos: Omit<TodoItemProps, "onChangeHandler" | "index">[];
  onChangeHandler: Function;
};

export default function TodoList(props: Props) {
  const { todos, onChangeHandler } = props;
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          {...todo}
          index={index}
          onChangeHandler={onChangeHandler}
        />
      ))}
    </div>
  );
}

import React from "react";
import TodoItem, { Props as TodoItemProps } from "../atoms/TodoItem";

type Props = {
  todos: TodoItemProps[];
  onChangeHandler: () => void;
};

export default function TodoList(props: Props) {
  const { todos, onChangeHandler } = props;
  return (
    <>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          {...todo}
          index={index}
          onChangeHandler={onChangeHandler}
        />
      ))}
    </>
  );
}

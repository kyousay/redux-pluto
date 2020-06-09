import React, { FormEvent, useState } from "react";
import { Field } from "redux-form";
import TodoList from "../../molecules/TodoList";
import { State as TodoState } from "../../../redux/modules/todo";
import { postTodo } from "../../../redux/modules/todo";

type Props = TodoState & {
  onChangeChecked: Function;
  handleSubmit: Function;
};

export default function Todo(props: Props) {
  const { todos, onChangeChecked, handleSubmit } = props;
  const postID = "todo" + (todos.length + 1);
  return (
    <>
      <TodoList todos={todos} onChangeHandler={onChangeChecked} />
      <form
        onSubmit={handleSubmit((values: { content: string }, dispatch: any) => {
          const newValues = Object.assign({}, values, { postID });
          dispatch(postTodo(newValues));
        })}>
        <Field name="content" component="input" type="text" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

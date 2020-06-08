import React, { FormEvent } from "react";
import { Field } from "redux-form";
import TodoList from "../../molecules/TodoList";
import { State as TodoState } from "../../../redux/modules/todo";

type Props = TodoState & {
  onChangeChecked: Function;
  handleSubmit: (e: FormEvent) => void;
};

export default function Todo(props: Props) {
  const { todos, onChangeChecked, handleSubmit } = props;
  return (
    <>
      <TodoList todos={todos} onChangeHandler={onChangeChecked} />
      <form onSubmit={handleSubmit}>
        <Field name="content" component="input" type="text" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

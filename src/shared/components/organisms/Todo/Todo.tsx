import React from "react";
import TodoList from "../../molecules/TodoList";
import styled from "styled-components";
import { State as TodoState } from "../../../redux/modules/todo";

type Props = TodoState & {
  onChangeChecked: () => void;
};

export default function Todo(props: Props) {
  const { todos, onChangeChecked } = props;
  return (
    <>
      <TodoList todos={todos} onChangeHandler={onChangeChecked} />
      <InputForm type="text" />
    </>
  );
}

const InputForm = styled.input`
  text-align: center;
  font-size: 1.8rem;
  border: 1px solid #d8d8d8;
`;

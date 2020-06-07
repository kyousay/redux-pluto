import React from "react";
import TodoList from "../../molecules/TodoList";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { changeChecked } from "../../../redux/modules/todo";
import { RootState } from "../../../redux/modules/reducer";

export default compose(
  connect(
    (state: RootState) => ({
      todos: state.app.todo.todos,
    }),
    dispatch => ({
      onChangeChecked: (index: number, checked: boolean) =>
        dispatch(changeChecked(index, checked)),
    }),
  ),
)(function Todo(props) {
  const { todos, onChangeChecked } = props;
  return (
    <>
      <TodoList todos={todos} onChangeHandler={onChangeChecked} />
      <InputForm type="text" />
    </>
  );
});

const InputForm = styled.input`
  text-align: center;
  font-size: 1.8rem;
  border: 1px solid #d8d8d8;
`;

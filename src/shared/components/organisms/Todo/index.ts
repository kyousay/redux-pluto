import { compose } from "redux";
import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { changeChecked, getTodos } from "../../../redux/modules/todo";
import { RootState } from "../../../redux/modules/reducer";
import Todo from "./Todo";

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
  asyncLoader((props, { dispatch }) => dispatch(getTodos())),
)(Todo);

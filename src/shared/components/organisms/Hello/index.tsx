import Hello from "./Hello";
import { compose } from "redux";
import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { reduxForm } from "redux-form";
import { RootState } from "../../../redux/modules/reducer";
import {
    changeVisibility,
    getComments,
    postComment,
} from "../../../redux/modules/hello";
export default compose(
    connect(
        (state: RootState) => ({
            isVisible: state.app.hello.isVisible, // store の state の中から、指定した isVisible を props として渡す
            comments: state.app.hello.comments,
        }),
        dispatch => ({
            onChangeVisibility: () => dispatch(changeVisibility()), // changeVisibilityを store に　dispatchする関数を返す
        }),
    ),
    asyncLoader((props, store) => store.dispatch(getComments())),
    reduxForm({
        form: "hello",
        onSubmit(values: { text: string }, dispatch: any) {
            dispatch(postComment(values));
        },
    }),
)(Hello);

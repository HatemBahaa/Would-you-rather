import { combineReducers } from "redux";
import users from "./usersReducer";
import questions from "./questionReducer";
import authedUser from "./authedUserReducer";


export default combineReducers({
    users,
    questions,
    authedUser,
})
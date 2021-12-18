import { GET_USERS, ANSWER_USER, ADD_ASKED_QUESTION } from "../Actions/users";


export default function users (state={},action){
    switch (action.type){
        case GET_USERS :
            return {
                ...state,
                ...action.users,
            }
        case ANSWER_USER :
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers : {
                        ...state[action.authedUser].answers,
                        [action.qid] : action.answer
                    }
                }
            }
        case ADD_ASKED_QUESTION :
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.id])
                }
            }
        default :
            return state
    }
}
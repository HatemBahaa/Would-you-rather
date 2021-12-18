import { GET_QUESTIONS } from "../Actions/questions";
import { ANSWER_QUESTION } from "../Actions/questions";
import {ADD_QUESTION} from "../Actions/questions"


export default function questions (state={},action){
    switch (action.type){
        case GET_QUESTIONS :
            return {
                ...state,
                ...action.questions,
            }
        case ANSWER_QUESTION :
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer] : {
                        ...state[action.qid][action.answer],
                        votes : state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case ADD_QUESTION :
            return {
                ...state,
                [action.id]:{
                    id: action.id,
                    timestamp: action.timestamp,
                    author:action.author,
                    optionOne: action.optionOne,
                    optionTwo: action.optionTwo                                  
                }
            }
        default :
            return state
    }
}
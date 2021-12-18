export const GET_USERS = 'GET_USERS'
export const ANSWER_USER = 'ANSWER_USER'
export const ADD_ASKED_QUESTION = 'ADD_ASKED_QUESTION'


export function getUsers (users){
    return {
        type: GET_USERS,
        users,
    }
}

export function answerUser ({authedUser, qid, answer}){
    return {
        type: ANSWER_USER,
        authedUser,
        qid,
        answer,
    }
}

export function addAskedQuestion (authedUser, id){
    return {
        type: ADD_ASKED_QUESTION,
        authedUser,
        id,
    }
}
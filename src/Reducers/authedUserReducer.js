import { LOG_AUTHED_USER, LOG_USER_OUT } from "../Actions/authedUser";


export default function authedUser (state=null,action){
    switch (action.type){
        case LOG_AUTHED_USER :
            return action.id
        case LOG_USER_OUT :
            return null
        default :
            return state
    }
}
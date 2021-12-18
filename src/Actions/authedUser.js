export const LOG_AUTHED_USER = 'LOG_AUTHED_USER'
export const LOG_USER_OUT = 'LOG_USER_OUT'


export function logAuthedUser (id){
    return {
        type: LOG_AUTHED_USER,
        id,
    }
}

export function logUserOut (){
    return {
        type: LOG_USER_OUT,
        payload : null
    }
}
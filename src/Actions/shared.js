import {_getQuestions, _getUsers,  _saveQuestion} from '../_DATA'
import { getQuestions, addQuestion, answerQuestion } from './questions'
import { getUsers, addAskedQuestion, answerUser } from './users'
import { _saveQuestionAnswer } from '../_DATA'



const users = _getUsers().then((users)=>{return users})
const questions = _getQuestions().then((questions)=>{return questions})


//to get initial data
export  function handleData (){
    return async(dispatch) => {
        dispatch(getUsers(await users))
        dispatch(getQuestions(await questions))       
    }
}



// for answering a question
export function handleAnswerQuestion (data){
    return (dispatch) => {
        return _saveQuestionAnswer(data).then(()=>{
            dispatch(answerQuestion(data))
            dispatch(answerUser(data))
        })
    }
}


// for adding a question
export function handleAddQuestion (data){
    return (dispatch) => {
        return _saveQuestion(data).then((formatted)=>{

            dispatch(addQuestion(formatted))
            dispatch(addAskedQuestion(formatted.author,formatted.id))
        })
    }
}







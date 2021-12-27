import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'



    const QuestionTypeRouter = ({ children, ...rest }) => {
      let checkAuth
      rest.authedUser !== null? checkAuth = true : checkAuth = false
     
        return (
          <Route {...rest} render={ (props) => {
            console.log(props.location.questionType)
            let qid = props.match.params.id
            let isAnswered
            let isfound

            for(let question of rest.dataQuestions){
              if(question === qid){
                isfound = true
                break
              }else{
                isfound = false
              }
            }

            if (isfound === false){
               return checkAuth === false?
                <Redirect to={{
                  pathname: '/',
                  state:{
                      from: props.location,
                  }
                }} />
              
              : <NotFoundPage /> 
            }

            for ( let question of rest.answerd){
              if(question === qid){
                isAnswered = true
                break
              }else{
                isAnswered = false
              }
            }

            return checkAuth
                    ? isAnswered
                        ? React.cloneElement(children[1], {id:props.match.params.id}) : React.cloneElement(children[0], {id:props.match.params.id})
                    : <Redirect to={{
                      pathname: '/',
                      state:{
                          from: props.location,
                      }
                    }} />
          }} />
        )
      }

       

function mapStateToProps({ authedUser, users, questions }) {

  let answerd = Object.keys(users[authedUser===null?'sarahedo':authedUser].answers)
  let dataQuestions = Object.keys(questions)

    return {
        authedUser,
        dataQuestions,
        answerd
    }
}

export default connect(mapStateToProps)(QuestionTypeRouter)
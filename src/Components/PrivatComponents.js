import React from 'react'
import {connect} from 'react-redux'
import { Route,  Redirect} from 'react-router-dom'


const PrivatComponents = ({ children, ...rest }) => {
    return (
      // <Route {...rest} render={ (props) => {
      //   return rest.authedUser !== null
      //     ? props.location.questionType 
      //       ? props.location.questionType === 'unanswered'
      //           ? React.cloneElement(children[0], {id:props.match.params.id}) : React.cloneElement(children[1], {id:props.match.params.id})
      //       : children
      //     : <Redirect to={{
      //       pathname: '/',
      //       state:{
      //           from: props.location,
      //       }
      //     }} />
      // }} />
      <Route {...rest} render={ (props) => {
        return rest.authedUser !== null
          ? children
          : <Redirect to={{
            pathname: '/',
            state:{
                from: props.location,
            }
          }} />
      }} />
    )
  }


  function mapStateToProps({authedUser}){
      return {
        authedUser
      }        
  }

  export default connect(mapStateToProps)(PrivatComponents)
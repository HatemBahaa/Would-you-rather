import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, ProgressBar} from 'react-bootstrap'
import { withRouter} from 'react-router-dom'


class AnsweredQuestion extends Component {


    render(){

        const {question, userAvatar, author, authedAnswer, votesOptOne, votesOptTwo}=this.props
        const total = votesOptOne + votesOptTwo
        
        
        return(
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`${userAvatar}`} />
                    <Card.Header>{author} Asks</Card.Header>
                    <Card.Body>
                        <Card.Title>Results:</Card.Title>
                        
                            <div>
                                <div  className='option'>
                                    {authedAnswer==='optionOne' && <span className='answer'>your answer</span>}
                                    <h6>{question.optionOne.text}</h6>
                                    <ProgressBar now={votesOptOne/total*100} label={`${votesOptOne/total*100}%`} />
                                    <span>{votesOptOne} out of {total}</span>
                                </div>
                                <div className='option'>
                                    {authedAnswer==='optionTwo' && <span className='answer'>your answer</span>}
                                    <h6>{question.optionTwo.text}</h6>
                                    <ProgressBar now={votesOptTwo/total*100} label={`${votesOptTwo/total*100}%`} />
                                    <span>{votesOptTwo} out of {total}</span>
                                </div>
                            </div>
                        
                    </Card.Body>
                </Card>
            </div>
        )
    }
}


function mapStateToProps({questions, users, authedUser}, {id}){
 
        return{
            question : questions[id],
            userAvatar : users[questions[id].author].avatarURL,
            author: users[questions[id].author].name,
            authedAnswer: users[authedUser===null?'sarahedo':authedUser].answers[id],
            votesOptOne :  questions[id].optionOne.votes.length,
            votesOptTwo : questions[id].optionTwo.votes.length,
            authedUser,
        }
    
}

export default withRouter(connect(mapStateToProps)(AnsweredQuestion)) 
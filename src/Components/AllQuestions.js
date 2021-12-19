import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'




class AllQuestions extends Component {


    render(){

        const {question, userAvatar,author, id, questionType}=this.props
             
        return(
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`${userAvatar}`} />
                    <Card.Header>{author} Asks</Card.Header>
                        <Card.Body>
                            <Card.Title>Would you rather</Card.Title>
                            <Card.Text>
                                {question.optionOne.text}
                            </Card.Text>
                            
                            {/* {questionType === 'unanswered' && 
                            <Link to={`/questions/${id}`}>
                                <Button variant="outline-success">
                                    View Poll
                                </Button>
                            </Link>
                            }

                            {questionType === 'answered' && 
                            <Link to={`/questions/${id}`}>
                                <Button variant="outline-success">
                                    View Poll
                                </Button>
                            </Link>
                            } */}

                            {questionType === 'unanswered' && 
                            <Link to={{
                                    pathname: `/questions/${id}`, 
                                    questionType: questionType 
                                }}>
                                <Button variant="outline-success">
                                    View Poll
                                </Button>
                            </Link>
                            }

                            {questionType === 'answered' && 
                            <Link to={{
                                pathname: `/questions/${id}`, 
                                questionType: questionType 
                            }}>
                                <Button variant="outline-success">
                                    View Poll
                                </Button>
                            </Link>
                            }
                            
                        </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, {id, type}){

    return{
        question : questions[id],
        userAvatar : users[questions[id].author].avatarURL,
        author: users[questions[id].author].name,
        authedUser,
        questionType : type,
    }
}

export default connect(mapStateToProps)(AllQuestions)
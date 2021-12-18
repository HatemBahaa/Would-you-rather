import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Button,Form } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import { handleAnswerQuestion } from '../Actions/shared'



class UnAnsweredQuestion extends Component {

    state={
        option: '',
        selectedOptionText : '',
        redirect: false
    }

    toggleAnswer = (e, optionLable) => {
        this.setState({
            option: e,
            selectedOptionText : optionLable
        })
    }

    handleSubmit = (e) => {
        const {authedUser, id} = this.props
        const {option} = this.state

        e.preventDefault()
        this.props.dispatch(handleAnswerQuestion({
            authedUser, 
            qid : id, 
            answer : option,
        }))
        
        this.setState({
            redirect : true
        })
    }

    render(){       

        const {question, userAvatar, author, id, authedUser}=this.props

        if(authedUser === null){
            return <Redirect to='/' />
        }

        if(this.state.redirect){
            return <Redirect to={`/answered-poll/${id}`} /> 
        }
        return(
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`${userAvatar}`} />
                    <Card.Header>{author} Asks</Card.Header>
                    <Card.Body>
                        <Card.Title>Would you rather</Card.Title>
                        <Form as='form' onSubmit={(e)=>this.handleSubmit(e)}>
                           
                                <Form.Check  as='input'
                                    name='optOne'
                                    checked={this.state.option === 'optionOne'}
                                    onChange={()=>this.toggleAnswer('optionOne', question.optionOne.text)} 
                                    type={'radio'}
                                    id='option'
                                    label={`${question.optionOne.text}`}
                                />

                                <Form.Check as='input'
                                    name='optTwo'
                                    checked={this.state.option === 'optionTwo'}
                                    onChange={()=>this.toggleAnswer('optionTwo', question.optionTwo.text)}
                                    type={'radio'}
                                    label={` ${question.optionTwo.text}`}
                                    id='option2'
                                />
                                
                            <Button type='submit' variant="primary" disabled={this.state.option === ''}>Answer Poll</Button>
                        </Form>
                        
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
        authedUser,
    }
}

export default connect(mapStateToProps)(UnAnsweredQuestion)
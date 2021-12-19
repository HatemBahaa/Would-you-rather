import React, {Component} from "react";
import {connect} from 'react-redux'
import {Form, Card, Button} from 'react-bootstrap'
import { handleAddQuestion } from "../Actions/shared";
import {Redirect} from 'react-router-dom'

class AddQuestion extends Component{

    state={
        firstFeild : '',
        secondFeild : '',
        redirect: false
    }

    handleInputChange = (e, type) => {
        if (type === 'firstFeild'){
            this.setState({firstFeild:e})
        }else if (type === 'secondFeild'){
            this.setState({secondFeild:e})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {authedUser} = this.props
        const {firstFeild,secondFeild} = this.state

        this.props.dispatch(handleAddQuestion({
            optionOneText : firstFeild,
            optionTwoText : secondFeild,
            author : authedUser,
        }))

        this.setState({
            redirect: true
        })       
    }

    render(){

        const{firstFeild, secondFeild} = this.state


        if(this.state.redirect){
            return <Redirect to='/home' />
        }

        
        return(
            <div>
                <Card className="add">
                <Card.Header as="h1">Create New Question</Card.Header>
                <Card.Body>
                    <Card.Title>Complete The Question</Card.Title>
                    
                    <Form onSubmit={(e)=>this.handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Would you rather ...</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter option one text here"
                                value={firstFeild} 
                                onChange={(e) => this.handleInputChange(e.target.value, 'firstFeild')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>OR</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter option two text here" 
                                value={secondFeild}
                                onChange={(e) => this.handleInputChange(e.target.value, 'secondFeild')}
                            />
                        </Form.Group>

                        <Button type='submit' variant="success" disabled={firstFeild==='' || secondFeild===''}>Submit</Button>
                    </Form>

                </Card.Body>
                </Card>
                
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return{
        authedUser,
    }
}

export default connect(mapStateToProps)(AddQuestion)
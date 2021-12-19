import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logAuthedUser} from '../Actions/authedUser'
import {Form, Button} from 'react-bootstrap'
import {Redirect, withRouter} from 'react-router-dom'




class LogIn extends Component {

    state={
        selected: false,
        authed: '',
        redirect : false,
    }
   
    logAuth = (e) => {        
        this.setState({
            selected: true,
            authed:e
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(logAuthedUser(this.state.authed)) 
        this.setState({
            redirect:true
        })
    }



    render(){ 
        
        const {users,location} = this.props
        
       if(this.state.redirect){         
            return <Redirect to= {location.state?.from || '/home'} />    
        }
        
        return(
            <div className='login'> 
                <h1>Welcome To Would You Rather App</h1>
                <h5>Please sign in to continue</h5>
                <img src='./logo192.png' alt='logo'></img>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Select className='log-form' aria-label="Default select example" onChange={(e)=>this.logAuth(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value={users[0]}>{users[0]}</option>
                        <option value={users[1]}>{users[1]}</option>
                        <option value={users[2]}>{users[2]}</option>       
                    </Form.Select>
                    <Button type='submit' variant="primary" disabled={!this.state.selected}>Sign In</Button> 
                </Form> 
            </div>
        )
    }
}


function mapStateToProps( {users, authedUser} ){ 
    return {
      users: Object.keys(users),
      authedUser,
    }
  }
  

export default withRouter(connect(mapStateToProps)(LogIn)) 
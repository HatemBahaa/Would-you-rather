import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { logUserOut } from '../Actions/authedUser'




class NavBar extends Component {




    handleLogOut = () => {
        this.props.dispatch(logUserOut())
    }


    render(){ 
        
        const { userName,userAvatar, authedUser}= this.props


        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#">Would You Rather</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as='span' ><NavLink to='/home'>Home</NavLink></Nav.Link>
                        <Nav.Link as='span' ><NavLink to='/add'>New Question</NavLink></Nav.Link>
                        <Nav.Link as='span' ><NavLink to='/leader-board'>Leader Board</NavLink></Nav.Link>
                    </Nav>
                    {authedUser !== null &&
                    <Nav>
                        <Nav.Link >Hello, {userName}</Nav.Link>
                        <img className='thumbnail' src={`${userAvatar}`} alt='user-avatar'></img>
                        <Nav.Link onClick={()=> this.handleLogOut()}>Logout</Nav.Link>
                    </Nav>
                    }
                </Navbar.Collapse>
                </Container>
                </Navbar> 
            </div>
        )
    }
}


function mapStateToProps({users, authedUser}){ 
    return {
      users: Object.keys(users),
      authedUser,
      userName : users[authedUser===null?'sarahedo':authedUser].name,
      userAvatar : users[authedUser===null?'sarahedo':authedUser].avatarURL,
    }
  }
  

export default connect(mapStateToProps)(NavBar)
import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import LogIn from './Components/LogIn'
import Home from './Components/Home'
import {handleData} from './Actions/shared'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import UnAnsweredQuestion from './Components/UnAnsweredQuestion'
import AnsweredQuestion from './Components/AnsweredQuestion'
import AddQuestion from './Components/AddQuestion'
import LeaderBoard from './Components/LeaderBoard'
import NavBar from './Components/NavBar'





class App extends Component{


  componentDidMount(){
    this.props.dispatch(handleData())  
  }

  render(){
    const { questions } = this.props
    

    if(questions === undefined){
        return(
            <></>         
        )
    }


    return(
      <Router>
        <div className="App">

          <NavBar />
          <Route path="/" exact render={(props) => <LogIn {...props}/>} />
          <Route path="/home" component={Home} />
          <Route path="/add" component={AddQuestion} />
          <Route path="/leader-board" component={LeaderBoard} />
          <Route path="/questions/:id" render={(props) => <UnAnsweredQuestion id={props.match.params.id}/>} />
          <Route path="/answered-poll/:id" render={(props) => <AnsweredQuestion id={props.match.params.id}/>} />

        </div>
      </Router>
    )
  }
}

function mapStateToProps( {users, questions, authedUser} ){
 
  
  return {
    questions : questions[Object.keys(questions)[0]],
    users: Object.keys(users),
    authedUser,
  }
}


export default connect(mapStateToProps)(App);

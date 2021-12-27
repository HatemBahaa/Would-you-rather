import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import LogIn from './Components/LogIn'
import Home from './Components/Home'
import {handleData} from './Actions/shared'
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import UnAnsweredQuestion from './Components/UnAnsweredQuestion'
import AnsweredQuestion from './Components/AnsweredQuestion'
import AddQuestion from './Components/AddQuestion'
import LeaderBoard from './Components/LeaderBoard'
import NavBar from './Components/NavBar'
import PrivatComponents from './Components/PrivatComponents'
import NotFoundPage from './Components/NotFoundPage'
import QuestionTypeRouter from './Components/QuestionTypeRouter'



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
          <Switch> 
          
            <Route path="/" exact render={(props) => <LogIn {...props}/>} />
            <PrivatComponents path="/home">
                <Home />
            </PrivatComponents>

            <PrivatComponents path="/add">
                <AddQuestion />
            </PrivatComponents>

            <PrivatComponents path="/leaderboard">
                <LeaderBoard />
            </PrivatComponents>
            

            <QuestionTypeRouter path='/questions/:id' >
                <UnAnsweredQuestion />
                <AnsweredQuestion /> 
           </QuestionTypeRouter>

            <PrivatComponents path='*' >
                <NotFoundPage /> 
            </PrivatComponents>
                

          </Switch>

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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import GeneralQuestion from './GeneralQuestion'




class Home extends Component {


    render(){

        const {unAnsweredQuestions, answeredQuestions}=this.props

        return(
            <div>
                {answeredQuestions
                    ?<Tabs style={{ width: '50%', margin: '100px auto' }} defaultActiveKey="UnAnswered questions" id="uncontrolled-tab-example" className="mb-3">

                        <Tab eventKey="UnAnswered questions" title="UnAnswered questions">
                            <ul>
                                {unAnsweredQuestions.map((question)=>(
                                    <li key={question}><GeneralQuestion id={question} type={'unanswered'}/></li>
                                ))}
                            </ul>
                        </Tab>

                        <Tab eventKey="Answered questions" title="Answered questions">
                            <ul>
                                {answeredQuestions.map((question)=>(
                                    <li key={question}><GeneralQuestion id={question} type={'answered'}/></li>
                                ))}
                            </ul>
                        </Tab>

                    </Tabs>
                    :<></>
                }

            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser}){
    
        return{
            unAnsweredQuestions : Object.keys(questions)
                        .filter((question) => question !==  Object.keys(users[authedUser===null?'sarahedo':authedUser].answers)
                        .find(answered => answered === question))
                        .sort((a,b) => questions[b].timestamp-questions[a].timestamp),
    
            answeredQuestions : users[authedUser===null?'sarahedo':authedUser]?  Object.keys(users[authedUser===null?'sarahedo':authedUser].answers).sort((a,b) => questions[b].timestamp-questions[a].timestamp) : false,
            authedUser,
        }
    
    
}

export default connect(mapStateToProps)(Home)
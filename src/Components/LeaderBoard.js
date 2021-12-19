import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card} from 'react-bootstrap'


class LeaderBoard extends Component {
       
    render(){

        const {users, leaderBoard} = this.props
        let counter = 1

        return(
            <div>
                <ul>
                    {leaderBoard.map((user, i)=>(
                        <li key={user.id}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Header as='h1'>{counter++}</Card.Header>                          
                            <Card.Img  variant="top" src={`${user.avatar}`} />
                            <Card.Header>{users[user.id].name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Answered Questions <span className='number'>{user.answered}</span></Card.Title>

                                <hr></hr>
                                <Card.Title>Created Questions <span className='number'>{user.asked}</span></Card.Title>
                               
                                <hr></hr>
                                <Card.Title>Score</Card.Title>
                                <span className='number score'>{user.score}</span>                               
                            </Card.Body>
                            </Card>
                        </li>
                    ))}    
                </ul>
            </div>
        ) 
    }
}


function mapStateToProps({users, authedUser}) {

    let board

    for (let user in users){
        let answered = Object.keys(users[user].answers).length
        let asked = users[user].questions.length
        let score = answered + asked
        let profile = {
            id:users[user].id, 
            avatar:users[user].avatarURL, 
            answered, 
            asked, 
            score
        }

        if(board === undefined){
            board = [profile]
        }else{
            for(let [index, obj] of board.entries()){
               
                if(board.length === Object.keys(users).length){
                    break;
                }
                if(profile.score >= obj.score){
                    board.splice(index, 0, profile)
                }else{
                    if(index+1 === board.length){
                        board = [...board, profile]
                    }
                }
            }
        }
    }


    return {
        users,
        authedUser,
        leaderBoard : board,
    }
}

export default connect(mapStateToProps)(LeaderBoard)

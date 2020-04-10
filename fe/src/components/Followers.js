import React from 'react'
import NavBar from './NavBar'
import { Card, Button, CardGroup, Accordion} from 'react-bootstrap'
// needs to have all of the users that follow this user. 
// Each user or client needs a button that remove from follower list
// Find new clients components with follow button
// with client info next to the button. 

class Followers extends React.Component{
    constructor(){
        super()
        this.state = {
            followers: [],
            renderState: false
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('token')

        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:3000/followers`, reqObj)
        .then(resp => resp.json())
        .then( data => 
            // console.log(data)
                this.setState({
                ...this.state, followers: data, renderState:true
            })
        )
    }

    deleteFollow = (event) => {
        if (this.props.profileState.profileInfo.isTherapist){

            const token = localStorage.getItem('token')
            const {therapist} = this.props.profileState.profileInfo
           
            const reqObj = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }
            
    
           
    
            fetch(`http://localhost:3000/followers/${event.target.name}`, reqObj)
            .then( resp => resp.json())
            .then( data => {
                console.log(data)
                    this.setState({
                        ...this.state, followers: data
                    })
    
                        }
                    )
            
        }
        else {
            const token = localStorage.getItem('token')
            const {client} = this.props.profileState.profileInfo
           
            const reqObj = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }
            
    
           
    
            fetch(`http://localhost:3000/followers/${event.target.name}`, reqObj)
            .then( resp => resp.json())
            .then( data => {
                console.log(data)
                    this.setState({
                        ...this.state, followers: data
                    })
    
                        }
                    )
            
        }
        
            }

    


    renderFollowers = () => {
        if (this.props.profileState.isTherapist === true){

            const find_follower_id = (followers) =>{
     
                 const followerObj = followers.find(
                     follow => {
                          return follow.therapist_id === this.props.profileState.profileInfo.therapist.id
                     } 
                 )
                 return followerObj.id
             }
         
             return this.state.followers.map(
                 follower => {
                         return <Accordion> 
                                 <Card style={{ width: '18rem' }}>
     
                             <Card.Header> {follower.user.full_name} </Card.Header>
     
                             <Card.Header>
                             <Accordion.Toggle as={Card.Header}  eventKey="0">
                                 Occupation
                             </Accordion.Toggle >
                             </Card.Header>
                             <Accordion.Collapse eventKey="0">
                             <Card.Body>{follower.occupation} </Card.Body>
                             </Accordion.Collapse>
           
                             <Card.Header>
                             <Accordion.Toggle as={Card.Header}  eventKey="0">
                                 Hobbies
                             </Accordion.Toggle >
                             </Card.Header>
                             <Accordion.Collapse eventKey="0">
                             <Card.Body>{follower.hobbies} </Card.Body>
                             </Accordion.Collapse>
         
                             <Card.Header>
                             <Accordion.Toggle as={Card.Header}  eventKey="0">
                                 Bio
                             </Accordion.Toggle >
                             </Card.Header>
                             <Accordion.Collapse eventKey="0">
                             <Card.Body>{follower.bio} </Card.Body>
                             </Accordion.Collapse>
     
     
     
                             <Button name ={find_follower_id(follower.followers)} onClick={(event) => this.deleteFollow(event)} >Unfollow</Button>
                             <hr/>
     
     
                         </Card>
                     </Accordion>
                     }
                 )
        }
        else {
            const find_follower_id = (followers) =>{
     
                const followerObj = followers.find(
                    follow => {
                        // console.log(this.props.profileState.profileInfo.client.id)
                         return follow.client_id === this.props.profileState.profileInfo.client.id
                    } 
                )
                return followerObj.id
            }
        
            return this.state.followers.map(
                follower => {
                        return <Accordion> 
                                <Card style={{ width: '18rem' }}>
    
                            <Card.Header> {follower.user.full_name} </Card.Header>
    
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="0">
                               Location
                            </Accordion.Toggle >
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>{follower.location} </Card.Body>
                            </Accordion.Collapse>
          
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="0">
                                Services
                            </Accordion.Toggle >
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>{follower.services} </Card.Body>
                            </Accordion.Collapse>

                            <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="0">
                                Specialty
                            </Accordion.Toggle >
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>{follower.specialties} </Card.Body>
                            </Accordion.Collapse>
        
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header}  eventKey="0">
                                Bio
                            </Accordion.Toggle >
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>{follower.bio} </Card.Body>
                            </Accordion.Collapse>
    
    
    
                            <Button name ={find_follower_id(follower.followers)} onClick={(event) => this.deleteFollow(event)} >Unfollow</Button>
                            <hr/>
    
    
                        </Card>
                    </Accordion>
                    }
                )
             }
        }
    


    render(){ 
        console.log("State", this.state, "Props", this.props)
        if (this.state.renderState){
            return(
                <div>
                    <NavBar/>
                <div>
                    <h1>Your Clients</h1>
                    <CardGroup>
                        {this.renderFollowers()}
                    </CardGroup>
                </div>
            </div>
            )
        }

        else {
            return(
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }
    }
}

export default Followers;
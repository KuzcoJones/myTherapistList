import React from 'react'
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
        const token = localStorage.getItem('token')
        const {therapist} = this.props.profileState.profileInfo
        const reqObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
        

       

        fetch(`http://localhost:3000/followers/${event.target.name}`, reqObj)
        .then( resp => resp.json())
        .then( data => console.log(data))
        
    }

    find_follower_id = (followers) =>{

        const followerObj = followers.find(
            follow => {
                 return follow.therapist_id === this.props.profileState.profileInfo.therapist.id
            } 
        )
        return followerObj.id
    }



    renderFollowers = () => {
        return this.state.followers.map(
            follower => {
                    return <li>{follower.user.full_name} <br/>
                        occupation: {follower.occupation} <br/>
                        hobbies: {follower.hobbies} <br/>
                        bio: {follower.bio} 
                        <button name ={this.find_follower_id(follower.followers)} onClick={(event) => this.deleteFollow(event)} >Unfollow</button>
                        <hr/>
                    </li>
                }
            )
    }


    render(){ 
        // console.log(this.state)
        if (this.state.renderState){
            return(
                <div>
                    <h1>Your Clients</h1>
                    <ul>
                        {this.renderFollowers()}
                    </ul>
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
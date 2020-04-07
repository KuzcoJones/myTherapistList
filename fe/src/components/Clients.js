import React from 'react'
// needs to have all of the users that follow this user. 
// Each user or client needs a button that remove from follower list
// Find new clients components with follow button
// with client info next to the button. 

class Clients extends React.Component{
    constructor(){
        super()
        this.state = {
            clients: []
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('token')

        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:3000/clients`, reqObj)
        .then(resp => resp.json())
        .then( data => this.setState({
            ...this.state, clients: data
        }))
    }


    render(){ 
        console.log(this.state)
        return(
            <div>
                <h1>Your Clients</h1>
            </div>
        )
    }
}

export default Clients;
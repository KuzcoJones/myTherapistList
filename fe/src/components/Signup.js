import React, { Component } from 'react'
import {
	withRouter
} from 'react-router-dom';
import ClientSU from './ClientSU';
import TherapistSU from './TherapistSU';


class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            isTherapist: false,
        }
    }

    handleForm = (event) => {
        event.preventDefault()
        console.log(this.state)
       
        const loginObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/signup', loginObj)
        .then(resp => resp.json())
        .then(data => {
            if(data.error){alert(data.error)}
            
            else { localStorage.setItem('token', data.token)
                this.props.history.push('/home')
                } 
            }
        ) 
    }

       

    therapistToggle = () => {
        console.log(this.state)
        // either render therapist signup or client input fields default client
        this.setState(prevState =>({
            isTherapist: !prevState.isTherapist
        }))
    }

    handleInputChange = (event) => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }

    render(){
        console.log(this.state)
        return(
            <div>
            <h1>Hello there</h1>
            <form onSubmit={(event) => {this.handleForm(event)} } action="" method="post">
                <label htmlFor="username">Username</label>
                <div>
                    <input onChange={(event) => {this.handleInputChange(event)}} 
                    type="text" name="username" id=""/>
                </div>

                <label htmlFor="full_name">Full name</label>
                <div>
                <input onChange={(event) => {this.handleInputChange(event)}}type="text" name="full_name" id="" placeholder="John Smith"/>
                </div>

                <label htmlFor="password">Password</label>
                <div>
                    <input onChange={(event) => {this.handleInputChange(event)}}type="text" name="password" id=""/>
                </div>

                <label htmlFor="isTherapist">Are you A Therapist?</label>
                <div>
                    <input onChange={this.therapistToggle} type="checkbox" name="isTherapist" id=""/>
                </div>
                {/* <ClientSU /> */}
            {this.state.isTherapist === false ? <ClientSU handleInputChange={this.handleInputChange}/> : <TherapistSU handleInputChange={this.handleInputChange}/> }
                

                <input type="submit" value="Signup"/>
            </form>
            </div>
        )
    }
}

export default withRouter(Signup)
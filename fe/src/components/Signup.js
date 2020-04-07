import React, { Component } from 'react'
import {
	withRouter
} from 'react-router-dom';


class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            isTherapist: false,
        }
    }

    toggleTherapistForm = (event) => {
        this.setState(prevState => ({
            isTherapist: !prevState.isTherapist
        }));
    }

    handleInputChange = (event) => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }

    handleForm = (event) => {
        event.preventDefault()
        // console.log(this.state)
       
        const loginObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/signup', loginObj)
        .then(resp => resp.json())
        .then(data => {console.log(data)
        //     // recieve data back from login user 
        //     // set token to local storage
        //     // redirect to the user profile with that data 

            if(data.error){
                alert(data.error)}
            else { 
                // if (this.state.isTherapist){this.props.therapistFetch(this.state)} 
                    localStorage.setItem('token', data.token)
                    
                    
                    if(this.state.isTherapist){
                        this.props.history.push('/signup/therapist')}
                    else{this.props.history.push('/signup/client')}
                    
                   
            }

            
            }
        ) 
    
}
    render(){
        
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
                    <input onChange={this.toggleTherapistForm} type="checkbox" name="isTherapist" id=""/>
                </div>
                <input type="submit" value="Continue"/>
            </form>
            </div>
        )
    }
}

export default withRouter(Signup)
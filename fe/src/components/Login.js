import React from 'react'
// recieveing therapist and client id from the backend from login and signup routes need to set it to app state and render info from the fetch.

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    handleInputChange = (event) => {
        this.setState({
           [event.target.name]: event.target.value
        })
    }

    handleLogin = (event) => {
        event.preventDefault()
        // console.log(this.state)
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/login', reqObj)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            // recieve data back from login user 
            // set token to local storage
            // redirect to the user profile with that data 
            
            if(data.error){
                alert(data.error)}
                else{
                        console.log(data)
                        localStorage.setItem('token', data.token)
                        this.props.profileInfo(data)
                        this.props.history.push('/home')
                }
            }
        )
    }

    goSignUp = () => {
        this.props.history.push('/signup')
    }

    
    

    
    render(){
        // console.log(this.state)
        return(
            <div>
                <div>
                    <h1>Welcome to Your Client List</h1>
                    <button onClick={this.goSignUp}>Signup</button>
                    
                    <h2>About Your Client List</h2>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magni obcaecati quasi autem tempora optio praesentium voluptatem odit vero sit.</p>
                    </div>
                </div>

                <div>
                    <form onSubmit={(event) => this.handleLogin(event)} action="" method="get">
                        <div>
                        <input type="text" placeholder="Username" name='username' onChange={ (event) => {this.handleInputChange(event)}}></input>

                        </div>
                        <div>
                        <input type="password" name="password" onChange={ (event) => {this.handleInputChange(event)}}id="" placeholder="password"/>
                        </div>
                        <input type="submit" value="login"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
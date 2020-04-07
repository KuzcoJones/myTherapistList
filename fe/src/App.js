import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import TherapistSU from './components/TherapistSU'
import ClientSU from './components/ClientSU'
import Profile from './components/Profile'
import Posts from './components/Posts'
import NavBar from './components/NavBar'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      profileInfo: {},
      new_clients: []
    }
  }


  componentDidMount(){
    if(localStorage.token){
      const token = localStorage.getItem('token')
        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`},
        }

      fetch(`http://localhost:3000/current_user`, reqObj)
      .then(resp => resp.json())
      .then(data => {

        if(data.error){
          alert(data.error)}
          else{
            
            this.setState({
              profileInfo: data
            })
          }
        }
      )

      fetch(`http://localhost:3000/clients`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          new_clients: data
        })
      })
    }
  }


  profileInfo = (data) => {
    this.setState({
        profileInfo: data
    })
  }

  


  




  // Step two conditionally render the Therapist Profile or the Client Profile associated with that user. 
  // Might can conditionally render shit in the NavBar also. 

  render(){
    // console.log(this.state)
    return(
      <div>
        <Router>

            <NavBar/>
            <Switch>
            <Route exact path='/' render= { (props) => <Login {...props} profileInfo= {this.profileInfo}/>}  />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signup/therapist' render={ (props) => <TherapistSU {...props} profileInfo={this.profileInfo} />} /> 
            <Route exact path='/signup/client' component={ClientSU} /> 
            <Route exact path='/home' render={ (props) => <Profile {...props} profileState = {this.state}/>} />

            <Route exact path='/posts' render={ (props) => <Posts {...props} profileState = {this.state}/>} />
            </Switch>
            

        </Router>
      </div>
    )
  }  
}

export default App;

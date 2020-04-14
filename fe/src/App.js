import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import TherapistSU from './components/TherapistSU'
import ClientSU from './components/ClientSU'
import Profile from './components/Profile'
import Posts from './components/Posts'
import NavBar from './components/NavBar'
import Followers from './components/Followers'

import { Container, Row, Col }from 'react-bootstrap';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      profileInfo: {},
      non_followers: []
    }
  }


  componentDidMount(){
  }


  loadProfileInfo = (data) => {
    this.setState({
        profileInfo: data
    })
  }

  

  render(){
    return(
      <div>
        <Router>
            <Switch>
            <Route exact path='/' render= { (props) => <Login {...props} profileInfo= {this.profileInfo}/>}  />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signup/therapist' render={ (props) => <TherapistSU {...props} profileInfo={this.profileInfo} />} /> 

            <Route exact path='/signup/client' render={(props) => <ClientSU {...props} profileInfo={this.profileInfo}/>} />

            <Route exact path='/home' render={ (props) => <Profile {...props}loadProfileInfo = {this.profileInfo} profileInfo = {this.state}/>} />

            <Route exact path='/followers' render={ (props) => <Followers {...props} profileState = {this.state}/>} />

            {/* < Followers profileInfo = {this.state.profileInfo} /> */}

            <Route exact path='/posts' render={ (props) => <Posts {...props} profileState = {this.state}/>} />
            </Switch>
            

        </Router>
      </div>
    )
  }  
}

export default App;

import React from 'react'
import {NavLink} from 'react-router-dom'

const link = {
    background: 'grey',
    width: '100px',
    margin: '6px 6px 6px 6px',
    color: 'red'
}

class NavBar extends React.Component{

    exitApp = () => {
        localStorage.removeItem('token')
    }

    render(){
        return(
        <div>

            <NavLink to='/home' exact style={link}>
                Home
            </NavLink>

            <NavLink to='/followers'exact style={link} >
                Followers
            </NavLink>

            <NavLink to='/posts' exact style={link} >
                Posts
            </NavLink>

        

             <NavLink onClick = {this.exitApp} to='/' exact style={link} >
                Logout 
            </NavLink>


        </div>
        )
    }
}

export default NavBar
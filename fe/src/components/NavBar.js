import React from 'react'
import {NavLink} from 'react-router-dom'

const link = {
    background: 'pink',
    width: '100px',
    margin: '6px 6px 6px 6px',
    color: 'blue'
}

class NavBar extends React.Component{
    render(){
        return(
        <div>

            <NavLink to='/' exact style={link}>
                Home
            </NavLink>

            <NavLink to='/'exact style={link} >
                Therapists
            </NavLink>

            <NavLink to='/' exact style={link} >
                Posts
            </NavLink>

             <NavLink to='/' exact style={link} >
                Logout
            </NavLink>


        </div>
        )
    }
}

export default NavBar
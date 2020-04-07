import React from 'react'
// list of posts from therapsit to edit 
// new client search form

class Posts extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: []
            // include here a trigger to render loading or content
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        
        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
        
        fetch(`http://localhost:3000/posts`, reqObj)
        .then(resp => resp.json())
        .then(data => this.setState({
            ...this.state, posts: data
        }))
    }
    render(){
        // if statement here to load componenent and render list of post and date. 
        // and make them editable and deletable. 
        return(
            <div>
                <h1>
                    User Saved Posts
                </h1>
            </div>
        )
    }
}

export default Posts
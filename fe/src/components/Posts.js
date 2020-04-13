import React from 'react'
import NavBar from './NavBar'
// to-do only edit one post at a time

class Posts extends React.Component{
    constructor(){
        super()
        this.state = {
           posts: [],
            renderState: false,
            postBody: ''
            // include here a trigger to render loading or content
        }
    }

    componentDidMount(){
        // const token = localStorage.getItem('token')
        
        // const reqObj = {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        // }
        
        // fetch(`http://localhost:3000/posts`, reqObj)
        // .then(resp => resp.json())
        // .then(data => {

        //     if(data.error){
        //       alert(data.error)}
        //       else{
               
        //         this.setState({
        //           ...this.state, posts: data.posts
        //           , renderState: true
        //         })
        //       }
        //     }
        // )
    }

    deletePost = (event) => {
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        }

        fetch(`http://localhost:3000/posts/${event.target.name}`, reqObj)
        .then(resp => resp.json())
        .then( data => {
            if(data.error){
            alert(data.error)}
            else{
              this.setState({
                ...this.state, posts: data.posts, rendered: true
              })
            //   this.setState({
            //       ...this.state, rendered: false
            //   })
            }
          }
      )}

      editPost = () => {
        this.setState({
            ...this.state, renderState: 'edit'
        })
      }

      saveEdit = (event) => {
        //   console.log(this.state.postBody)
          event.preventDefault()
          const token = localStorage.getItem('token')

          const reqObj = {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({postBody: this.state.postBody})
          }
          fetch(`http://localhost:3000/posts/${event.target.name}`, reqObj)
          .then( resp => resp.json())
          .then(data => {
              this.setState({
                  ...this.state, posts: data.posts, renderState: true
                })
          })
      }
    
      setEditBody = (event) => {
          this.setState({
              ...this.state, postBody: event.target.value
          })

      }

      back = () => {
          this.setState({
              ...this.state, renderState: true
          })
      }
    
    renderPost = () => {
        if (this.state.renderState === true){

            return this.state.posts.map( post => {
                        return <li data-id = {post.id} >created: {post.created_at} <br/> {post.body}  <button name= {post.id} onClick= {(event) => this.deletePost(event)}>delete</button> <button data-id = {post.id} onClick={this.editPost}>edit</button></li>
                })
             }

             else if (this.state.renderState === 'edit') {
                return this.state.posts.map( post => {
                    return <li>created: {post.created_at} <br/> <form name={post.id} onSubmit={(event) => this.saveEdit(event)}>
                        <input onChange={(event) => this.setEditBody(event)} type="text" name="edit_body" id="" placeholder={post.body} />
                        <input type="submit" value="Save"/>
                    </form>
                    <button onClick = {this.back} >Back</button>
                    </li>
            })
             }
        }

    render(){
        console.log(this.state)
        // if statement here to load componenent and render list of post and date. 
        // and make them editable and deletable. 
        if (this.state.renderState){
            return(
                <div>
                    <NavBar/>
                    <h1>
                        User Saved Posts
                    </h1>

                    <ul>
                        {this.renderPost()}
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

export default Posts
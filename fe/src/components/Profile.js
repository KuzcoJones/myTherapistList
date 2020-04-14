import React from 'react'
import SearchBar from './SearchBar'
import {Jumbotron, Image} from 'react-bootstrap'
import NavBar from './NavBar'



class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            renderState: false,
            profileInfo: {},
            followers: [],
            post_body: '',
            editProfile: {}
            
            
        }
    }
    
    
 
    
    componentDidMount(){
        const token = localStorage.getItem('token')
        
        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:3000/current_user`, reqObj)
      .then(resp => resp.json())
      .then(data => {

        if(data.error){
          alert(data.error)}
          else{
            
            this.setState({
              ...this.state, profileInfo: data, renderState: true
            })
          }
        }
      ) 
    }

 

   

    createPost = (e) => {
        e.preventDefault()
        e.target.reset()
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/posts', reqObj)
        .then(resp => resp.json())
        .then(data => console.log('======= create post fetch',data))
    }

    postBody = (event) => {
        this.setState({
            ...this.state, post_body: event.target.value
        })
    }

   

    

    

   
    
    renderEdit = () => {
        this.setState({
            ...this.state, renderState: 'edit'
        })
    }

    saveEdit = () => {
        const token = localStorage.getItem('token')
        this.setState({
            ...this.state, renderState: true
        })

        const reqObj = {
            method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(this.state.editProfile)
        }

        fetch(`http://localhost:3000/therapists/${this.state.profileInfo.therapist.id}`, reqObj)
        .then(resp => resp.json())
        .then( data => console.log(data))
    }

    editData = (event) => {
        this.setState({
            editProfile:{ ...this.state.editProfile, [event.target.name] : event.target.value}
        })
    }
    
    renderDefaultState = () => {
        this.setState({
            ...this.state, renderState: true
        })
    }
    
    
    
    
    render(){
        console.log(this.state)
        const { therapist } = this.state.profileInfo
        if (this.state.renderState === true && this.state.profileInfo.isTherapist === true){
            return(
                    <div>
                        <NavBar/>
                <div>
                    <button onClick ={this.renderEdit} >Edit</button>
                     <div> 
                     <Jumbotron className="profile-info" >
                        
                        <Image src="holder.js/171x180" rounded />

                        <h3>Bio: {this.state.profileInfo.bio}</h3>

                        <h3>Location: {this.state.profileInfo.location}</h3>

                        <h3>Services: {this.state.profileInfo.services}</h3>

                        <h3>Specialties: {this.state.profileInfo.specialty}</h3>
                        
                        
                     </Jumbotron>
    
                     <div id="newsfeed-timeline" >
                     {/* map through list of followers and  */}
                        {/* {this.newsFeedList()} */}
                         <ul>
                             {/* list of posts from list of all followers */}
                         </ul>
                     </div>
    
                     <div id="create-post-form" >
                         {/* create a post fetch method onClick */}
                         <form onSubmit= {(event) => this.createPost(event)} action="">
                            <label htmlFor="posts">Create a Post</label>
                             <input onChange = {(event) => this.postBody(event)} type="text" name="posts" id=""/>
                             <input type="submit" value="post"/>
                         </form>
                     </div>

                     <SearchBar profileInfo= {this.state.profileInfo} />
    
                    
    
    
                 </div>
                </div>
             </div>
            )

        
        }

        else if(this.state.renderState === 'edit'){
            return (
                <div>

                    <form onSubmit= {this.saveEdit} action="" method="post" value="save" >
                        <input onChange = {(event) => this.editData(event)} type="text" name="bio" id="" placeholder={this.state.profileInfo.therapis0uydL8t.bio}/>
    
                        <input onChange = {(event) => this.editData(event)} type="text" name="location" id="" placeholder={this.state.profileInfo.therapist.location}/>
    
                        <input onChange = {(event) => this.editData(event)} type="text" name="services" id="" placeholder={this.state.profileInfo.therapist.services}/>
                        <input onChange = {(event) => this.editData(event)} type="text" name="specialties" id="" placeholder={this.state.profileInfo.therapist.specialties}/>
                        <input type="submit" placeholder="save" value="save" />
                    </form>
                    <button onClick = {this.renderDefaultState} >Back</button>
                </div>
            )
        }

        else if(this.state.renderState && this.state.profileInfo.isTherapist === false){
                return(
                    <div>
                        <NavBar/>
                <div>
                    <button onClick ={this.renderEdit} >Edit</button>
                     <div> 
                     <Jumbotron className="profile-info" >
                        
                        <Image src="holder.js/171x180" rounded />

                        <h3>Bio: {this.state.profileInfo.bio}</h3>

                        <h3>Occupation: {this.state.profileInfo.occupation}</h3>

                        <h3>Hobbies: {this.state.profileInfo.hobbies}</h3>

                        {/* <h3>LifeStyle: {this.state.profileInfo.lifestyle} </h3> */}

                        {/* <h3>Specialties: {this.state.profileInfo.client.specialties}</h3> */}
                        
                        
                     </Jumbotron>
    
                     <div id="newsfeed-timeline" >
                     {/* map through list of followers and  */}
                        {/* {this.newsFeedList()} */}
                         <ul>
                             {/* list of posts from list of all followers */}
                         </ul>
                     </div>
    
                     <div id="create-post-form" >
                         {/* create a post fetch method onClick */}
                         <form onSubmit= {(event) => this.createPost(event)} action="">
                            <label htmlFor="posts">Create a Post</label>
                             <input onChange = {(event) => this.postBody(event)} type="text" name="posts" id=""/>
                             <input type="submit" value="post"/>
                         </form>
                     </div>

                     <SearchBar profileInfo= {this.state.non_followers} />
                     
    
                    
    
    
                 </div>
                </div>
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

export default Profile
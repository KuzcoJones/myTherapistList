import React from 'react'

class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            mounted: false,
            non_followers: []
        }
    }


    componentDidMount(){
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }
        fetch(`http://localhost:3000/clients`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                mounted:true, non_followers: data
            })
        })

        
    }

    non_follow_clients = () => {
        return this.state.non_followers.map(
            client => {
                return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, 
                     <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
                     <hr/> 
                        </li>
            }
        )
    }



    follow = (event) => {
        const token = localStorage.getItem('token')
        const postObj = {
            method: "POST",
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({client: event.target.name})
        }
        fetch('http://localhost:3000/followers', postObj)
        .then(resp => resp.json() )
        .then( data => {
                this.setState({
                    ...this.state, non_followers: data
                })
           
        })
    }

    filterClients = (event) => {
        // console.log(this.state.non_followers, event.target.value)
        // console.log(follower.occupation, follower.hobbies, follower.user.full_name)

        const filtered_followers = this.state.non_followers.filter(follower => {
            return follower.occupation.includes(event.target.value) || follower.user.full_name.includes(event.target.value) 
        } )

     this.setState({...this.state, non_followers: filtered_followers})
    }



    render(){
        console.log(this.state)
        if(this.state.mounted){


        return(
            <div>
                <h1>Search Bar</h1>

                 <div className="client-search">
                         {/* fetch to update list */}


                     <form action="" method="get">
                         <input onChange= {(event) => this.filterClients(event)} type="text" name="client-search" id=""/>
                         {/* search scroll box for client list */}
                     </form>

                     <div id="client-finder">
                         <ul id="client-list">
                         <div >
                         <ul>
                             {this.non_follow_clients()}
                         </ul>
                     </div>
                            {/* {this.props.clients.map} */}
                             {/*map through list that doesn't match an id on the followers list  */}
                             {/* list every client in data with button to make a follower*/}
                         </ul>

                     </div>

                 </div>
            </div>
            )
        }
        else return(
            <div>
                <h2>Loading</h2>
            </div>
        )
    }
}

export default SearchBar
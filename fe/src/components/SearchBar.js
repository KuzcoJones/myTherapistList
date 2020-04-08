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
                return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, hobbies: {client.hobbies}
                     <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
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
        fetch('http://localhost:3000/clients', postObj)
        .then(resp => resp.json() )
        .then( data => console.log(data))
    }



    render(){
        
        if(this.state.mounted){


        return(
            <div>
                <h1>Search Bar</h1>

                 <div className="client-search">
                         {/* fetch to update list */}
                     <form action="" method="get">
                         <input type="text" name="client-search" id=""/>
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
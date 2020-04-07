import React from 'react'

class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            
        }
    }




    non_follow_clients = () => {
        return this.props.new_clients.map(
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
        fetch('http://localhost:3000/followers', postObj)
        .then(resp => resp.json() )
        .then( data => console.log(data))
    }



    render(){
        console.log(this.props.new_clients)
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
}

export default SearchBar
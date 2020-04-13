import React from 'react'

class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            mounted: false,
            non_followers: [],
            filteredList: []
        }
    }


    componentDidMount(){
        // const token = localStorage.getItem('token')
        // const reqObj = {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        // }

        // fetch(`http://localhost:3000/clients`, reqObj)
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log("fetched data", data)
        //     this.setState({
        //         mounted:true, non_followers: data
        //     })
        // })

        
    }

    non_follow_clients = () => {
        if (this.props.profileInfo.isTherapist === true){

            if (this.state.filteredList.length > 0){
    
                return this.state.filteredList.map(
                    client => {
                        return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, 
                             <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
                             <hr/> 
                                </li>
                    }
                )
            }
            else{
                return this.state.non_followers.map(
                    client => {
                        return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, 
                             <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
                             <hr/> 
                                </li>
                    }
                )
            }
        }

        else {
                if (this.state.filteredList.length > 0){
        
                    return this.state.filteredList.map(
                        client => {
                            return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, 
                                 <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
                                 <hr/> 
                                    </li>
                        }
                    )
                }
                else{
                    return this.state.non_followers.map(
                        client => {
                            return <li key={client.user.id}>{client.user.full_name}, occupation: {client.occupation}, 
                                 <button name={client.id} onClick={ (event) => this.follow(event)}>follow</button>
                                 <hr/> 
                                    </li>
                        }
                    )
                }
            
        }

    }



    follow = (event) => {
        if (this.props.profileInfo.isTherapist === true){

            const token = localStorage.getItem('token')
            const postObj = {
                method: "POST",
                headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({client: event.target.name})
            }
            fetch('http://localhost:3000/followers', postObj)
            .then(resp => resp.json() )
            .then( data => { console.log("fetch back from follow action",data)
                    this.setState({
                        ...this.state, non_followers: data
                    })
               
            })
        }

        else{
            // console.log(event.target.name)
            const token = localStorage.getItem('token')
            const postObj = {
                method: "POST",
                headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({therapist_id: event.target.name})
            }
            fetch('http://localhost:3000/followers', postObj)
            .then(resp => resp.json() )
            .then( data => { 
                // console.log("fetch back from follow action",data)
                    this.setState({
                        ...this.state, non_followers: data
                    })
               
            })
        }
    }

    filterClients = (event) => {
        // console.log(this.state.non_followers, event.target.value)
        // console.log(follower.occupation, follower.hobbies, follower.user.full_name)
        const currentList = this.state.non_followers
        let newList = []

        
        if (event.target.value !== ""){

             newList = this.state.non_followers.filter(follower => {
                 const occupation = follower.occupation.toLowerCase();

                 const full_name = follower.user.full_name.toLowerCase()

                 const filter = event.target.value.toLowerCase();

                return occupation.includes(filter) || full_name.includes(filter) 
            } )
            
        }
        else {
             newList = this.state.non_followers 
            }

     this.setState({...this.state, filteredList: newList})
    }



    render(){
        console.log(this.props)
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
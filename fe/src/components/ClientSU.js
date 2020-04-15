import React from 'react'



class ClientSU extends React.Component{
    constructor(){
        super()
        this.state= {

        }
    }
    

//     handleForm = (event) => {
//         event.preventDefault()
//         const token = localStorage.getItem('token')
       
//         const reqObj = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
//             body: JSON.stringify(this.state)
//         }
    
//         fetch('http://localhost:3000/clients', reqObj)
//         .then(resp => resp.json())
//         .then(data => {
//             // recieve data back from login user 
//             // set token to local storage
//             // redirect to the user profile with that data 

//             if(data.error){
//                 alert(data.error)}

//             else { 
                
//                     localStorage.setItem('token', data.token)
//                     this.props.profileInfo(data)
//                     this.props.history.push('/home')
                   
//             }

            
//             }
//         ) 
    
// }

    render(){


        return(
            <div>


                <div>
                    
                            <label htmlFor="hobbies">Hobbies</label>
                        <div>
                            <input onChange= {(event) => this.props.handleInputChange(event)} type="text" name="hobbies" id="" placeholder='Rock Climbing, Swimming, Tennis'/>
                        </div>

                            <label htmlFor="occupation">occupation</label>
                        <div>
                            <input onChange= {(event) => this.props.handleInputChange(event)} type="text" name="occupation" id="" placeholder="Desk Job"/>
                        </div>

                        <label htmlFor="bio">Biography</label>
                        <div>
                        <textarea onChange= {(event) => this.props.handleInputChange(event)} name="bio" id="" cols="30" rows="10" maxLength='250'></textarea>
                        </div>
                        {/* <input type="submit" value="Signup"/> */}

                    
                </div>
            </div>
        )
    }
}

export default ClientSU



// t.string "hobbies"
// t.string "occupation"
// t.string "bio"
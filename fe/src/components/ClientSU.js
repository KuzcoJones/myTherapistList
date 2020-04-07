import React from 'react'



class ClientSU extends React.Component{
    constructor(){
        super()
        this.state= {

        }
    }
    handleInputChange = (event) => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }

    handleForm = (event) => {
        event.preventDefault()
        console.log(this.state)
       
        // const loginObj = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.state)
        // }
    
        // fetch('http://localhost:3000/signup', loginObj)
        // .then(resp => resp.json())
        // .then(data => {
        //     // recieve data back from login user 
        //     // set token to local storage
        //     // redirect to the user profile with that data 

        //     if(data.error){
        //         alert(data.error)}
        //     else { 
        //         if (this.state.isTherapist){this.props.therapistFetch(this.state)} 
        //             localStorage.setItem('token', data.token)
        //             this.props.userInfo(data)
                    this.props.history.push('/home')
                   
        //     }

            
        //     }
        // ) 
    
}

    render(){

console.log(this.state)
        return(
            <div>

                <div>
                    <h1>Hello Clients, Welcome to My ClientList</h1>
                    <h3>Please Provide some information to improve your Experience</h3>
                </div>

                <div>
                    <form onSubmit= {(event) => this.handleForm(event)} action="">
                            <label htmlFor="hobbies">Hobbies</label>
                        <div>
                            <input onChange= {(event) => this.handleInputChange(event)} type="text" name="hobbies" id="" placeholder='Rock Climbing, Swimming, Tennis'/>
                        </div>

                            <label htmlFor="occupation">occupation</label>
                        <div>
                            <input onChange= {(event) => this.handleInputChange(event)} type="text" name="occupation" id="" placeholder="Desk Job"/>
                        </div>

                        <label htmlFor="bio">Biography</label>
                        <div>
                        <textarea onChange= {(event) => this.handleInputChange(event)} name="bio" id="" cols="30" rows="10" maxLength='250'></textarea>
                        </div>
                        <input type="submit" value="Signup"/>

                    </form>
                </div>
            </div>
        )
    }
}

export default ClientSU



// t.string "hobbies"
// t.string "occupation"
// t.string "bio"
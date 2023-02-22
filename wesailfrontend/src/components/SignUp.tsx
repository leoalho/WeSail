/* eslint-disable @typescript-eslint/no-misused-promises */

import {Button} from 'react-bootstrap'
import {signUp} from '../services/users'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()

    const handleSignUp = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const username = (document.getElementById('username') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value
        const password2 = (document.getElementById('password2') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        if (password !== password2){
            console.log("Passwords don't match")
            return
        }
        await signUp({username, password, email})
        console.log("Created new user")
        navigate('/')
    }
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <div className='login'>
        <form onSubmit={handleSignUp} className="form">
        <center><h2>SIGNUP</h2></center>
        <div>
        username: 
        <input type="text" name="Username" id="username"  />
        </div>
        <div>
        Email: 
        <input type="text" name="Email" id="email"  />
        </div>
        <div> 
        password: 
        <input type="password" name="Password" id="password" />
        </div>
        <div> 
        password again: 
        <input type="password" name="Password2" id="password2" />
        </div>
        <Button className="button" type="submit" style={{fontSize:"20px", width: "100%", border: "1px"}}>Create user</Button>
    </form>
    </div>
    )
}

export default SignUp
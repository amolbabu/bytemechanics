import React, {Component} from 'react';

class Registration extends Component {
    render() {
        return (
            <div className="container">
                <h1>Welcome to Nao</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <label htmlFor="text"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" name="name" id='name' required/>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required/>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="pwd" id="pwd" required/>
                <label htmlFor="psw-repeat"><b>Confirm Password</b></label>
                <input type="password" placeholder="Confirm Password" name="confirmpwd" required/>
                <hr/>
                <p>By creating an account you agree to Credit Suisse <a href="#">Terms & Privacy</a>.</p>

                <button type="submit" className="registerbtn">Register</button>
                <hr/>
                <div className="container signin">
                    <p>Already have an account? <a href="/login">Sign in</a>.</p>
                </div>
            </div>
        );
    }
}
export default Registration
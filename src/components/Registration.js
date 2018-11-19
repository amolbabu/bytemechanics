import React, {Component} from 'react';
import firebase from "../fire";

class Registration extends Component {


    constructor(props) {
        super(props);
        this.state = {
            emailId: this.emailId,
            password: this.pwd

        }
    }

    updateEmailState(value) {
        this.setState({emailId: value});
    }

    updatePwdState(value) {
        this.setState({pwd: value});
    }


    registerUser(email, password) {
        console.log("Inside register User");
        console.log("emailID " + email);
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }


    render() {
        return (
            <div className="container">
                <h1>Welcome to Nao</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <label htmlFor="text"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" name="name" id='name' required/>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="emailId" id='emailId' required
                       onChange={(evt)=>this.updateEmailState(evt.target.value)}/>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="pwd" id="pwd" required
                       onChange={(evt)=>this.updatePwdState(evt.target.value)}/>
                <label htmlFor="psw-repeat"><b>Confirm Password</b></label>
                <input type="password" placeholder="Confirm Password" name="confirmpwd" required/>
                <hr/>
                <p>By creating an account you agree to Credit Suisse <a href="#">Terms & Privacy</a>.</p>


                <button onClick={(e) => (this.registerUser(this.state.emailId, this.state.pwd))}>
                    Sign-Up
                </button>

                <hr/>
                <div className="container signin">
                    <p>Already have an account? <a href="/login">Sign in</a>.</p>
                </div>
            </div>
        );
    }
}

export default Registration
import React, {Component} from 'react';
import firebase from "../fire";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: this.emailId,
            password: this.pwd,
            error: this.error
        }
    }

    updateEmailState(value) {
        this.setState({emailId: value});
    }

    updatePwdState(value) {
        this.setState({pwd: value});
    }

    setError(value) {
       this.setState({error: value});
    }




    authenticateUser(emailId, password) {
        return firebase.auth().signInWithEmailAndPassword(emailId, password).catch((error)=>{
            this.setError(error.message)
        });

    }


    render() {
        const errors = this.state.error
        return (
            <body>

            <div className="container">
                <h1 align="center">Welcome to Nao</h1>


                <ul className="errors"><strong><font color="red">{errors}</font></strong></ul>
                <div className="row">
                    <div className="vl">
                        <span className="vl-innertext">or</span>
                    </div>


                    <div className="col">
                        <div className="hide-md-lg">
                            <p>Or sign in manually:</p>
                        </div>

                        <input type="text" name="username" placeholder="Username" required
                               onChange={(evt)=>this.updateEmailState(evt.target.value)}/>
                        <input type="password" name="password" placeholder="Password" required
                               onChange={(evt)=>this.updatePwdState(evt.target.value)}/>
                        <input type="submit" value="Login" onClick={(e) => (this.authenticateUser(this.state.emailId, this.state.pwd))}/>
                    </div>
                    <div className="col">
                        <input type="button" value="Login as Guest"/>
                    </div>

                </div>

            </div>

            <div align="center">
                <p><a href="/SignUp">Sign me up</a>.</p>
                <p>Forgot password <a href="#">Forgot password</a>.</p>
            </div>

            </body>
        );
    }
}

export default Login;
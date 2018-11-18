import React, { Component } from 'react';

class Login extends Component{

    render(){
        return (
            <body>

            <div className="container">
                <h1 align="center">Welcome to Nao</h1>
                    <div className="row">
                        <div className="vl">
                            <span className="vl-innertext">or</span>
                        </div>


                        <div className="col">
                            <div className="hide-md-lg">
                                <p>Or sign in manually:</p>
                            </div>

                            <input type="text" name="username" placeholder="Username" required/>
                                <input type="password" name="password" placeholder="Password" required/>
                                    <input type="submit" value="Login"/>
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
import React, { Component } from 'react';
import {Label, ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import {Link} from 'react-router-dom';

class Error extends Component{

    render(){
        return (
            <header className="App-header">
                <div>
                    <h1>Oops, your have entered forbiden....</h1>

                    <h2>Click <Link to="/">here</Link> to go to home</h2>
                </div>
            </header>
        );
    }
}
export default Error;
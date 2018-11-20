import React, { Component } from 'react';
import {Button, Panel} from "react-bootstrap";
import firebase from "../fire";
import {Link} from 'react-router-dom';


class EventSummary extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

        let user = firebase.auth().currentUser;
        if(user){
            this.setState({email: user.email});
        }else{
            // console.log(user.email)
        }
    }

    render(){
        return (
            <div className="container">
                    event summary
            </div>
        );
    }
}
export default EventSummary;
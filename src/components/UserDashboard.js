import React, { Component } from 'react';
import {Button, Panel} from "react-bootstrap";
import firebase from "../fire";
import {Link} from 'react-router-dom';
import NaoNavigation from "./NaoNavigation";

class UserDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            events: []
        }
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
                this.setState({email: user.email});
                this.loadEvents();

            }
            else {
                this.props.history.push("/login")
            }
        });

    }

    loadEvents(){
        if(this.state.email.length >0){
            let questionRef =firebase.database().ref('/NAO/event').orderByChild('createdBy').equalTo(this.state.email);
            questionRef.on('value', snapshot=> {
                snapshot.forEach(data=>{
                    this.setState({events: [data.val()].concat(this.state.events)})
                })
            });
        }
    }

    render(){
        return (
            <div className="container">
                <NaoNavigation/>
                <h3>Past Events </h3>
                {this.state.events.map(event=>{
                    return (
                        <Panel key={event.id} bsStyle="success">
                            <Panel.Heading>

                                    <Panel.Title componentClass="h3">Title: <Link to={"/create-question?eventId="+event.eventId}> {event.heading} </Link>- {event.createdAt}</Panel.Title>

                            </Panel.Heading>
                            <Panel.Body> <strong>Description:</strong> <br/>{event.description}</Panel.Body>
                        </Panel>

                    );
                })}

            </div>
        );
    }
}
export default UserDashboard;
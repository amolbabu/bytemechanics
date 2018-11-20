import React, {Component} from 'react';
import firebase from "../fire";
import {Button} from "react-bootstrap";
import NaoNavigation from "./NaoNavigation";

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: this.eventName,
            eventDescription: this.eventDescription,
            error: this.error
        }
    }

    create(heading, description) {
        const eventId = this.generateMeetingId();
        console.log(heading + " :::: " + description + "::: Event Id::: " + eventId);

        firebase.database().ref('/NAO/event').push({
            eventId: eventId,
            heading: heading,
            description: description
        });


        this.props.history.push('/create-question?eventId=' + eventId);
    }

    generateMeetingId() {
        return Math.random().toString(36).substr(2, 5);
    }

    updateEventNameState(value) {
        this.setState({eventName: value});
    }

    updateEventDescriptionState(value) {
        this.setState({eventDescription: value});
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if (user) {

        } else {
            this.props.history.push('/login')
        }
    }

    logout() {
        firebase.auth().signOut().then(function () {
            console.error('Sign Out');
            window.location.reload();
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    render() {
        return (
            <div className="container">
                <NaoNavigation/>
                <br/>
                <p><strong>*Please fill in this form to create a Event or Meeting.</strong></p>
                <hr/>
                <label htmlFor="text"><b>Name</b></label>
                <input type="text" placeholder="Enter Event Name" name="eventName" id='eventName' required
                       onChange={(evt) => this.updateEventNameState(evt.target.value)}/>
                <label htmlFor="text"><b>Short Description</b></label>
                <input type="text" placeholder="Short Description" name="eventDescription" id='eventDescription'
                       maxLength="50" required
                       onChange={(evt) => this.updateEventDescriptionState(evt.target.value)}/>
                <hr/>
                <Button bsStyle="success" type="submit"
                        onClick={(e) => (this.create(this.state.eventName, this.state.eventDescription))}>
                    Post
                </Button>

            </div>
        );
    }
}

export default CreateEvent;
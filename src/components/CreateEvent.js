import React, {Component} from 'react';
import firebase from "../fire";


class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: this.eventName,
            eventDescription: this.eventDescription,
            error: this.error
        }

    }

    create(heading, discription) {
        const eventId = this.generateMeetingId();
        console.log(heading + " :::: " + discription + "::: Event Id::: " + eventId);
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
        var user = firebase.auth().currentUser;
        if (user) {
        } else {
            this.props.history.push('/login')
        }
    }


    render() {
        return (
            <div className="container">
                <div className="internalheader">
                    <h1>Nao</h1>
                </div>
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
                <input type="submit" value="Submit"
                       onClick={(e) => (this.create(this.state.eventName, this.state.eventDescription))}/>
            </div>
        );
    }
}

export default CreateEvent;
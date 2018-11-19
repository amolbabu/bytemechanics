import React, {Component} from 'react';

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
        const eventId=this.generateMeetingId();
        console.log(heading+" :::: "+discription+"::: Event Id::: "+eventId);
        this.props.history.push('/Ask?eventId='+eventId);
    }

    generateMeetingId() {
       return Math.random().toString(36).substr(2, 5);
    }

    updateEventNameState(value){
        this.setState({eventName: value});
    }

    updateEventDescriptionState(value){
        this.setState({eventDescription: value});
    }


    render() {
        return (
            <div className="container">
                <h1>Welcome to Nao</h1>
                <p>Please fill in this form to create a Event or Meeting.</p>
                <hr/>
                <label htmlFor="text"><b>Name</b></label>
                <input type="text" placeholder="Enter Event Name" name="eventName" id='eventName' required
                       onChange={(evt) => this.updateEventNameState(evt.target.value)}/>
                <label htmlFor="text"><b>Short Description</b></label>
                <input type="text" placeholder="Short Description" name="eventDescription" id='eventDescription' maxLength="50" required
                       onChange={(evt) => this.updateEventDescriptionState(evt.target.value)}/>
                <hr/>

                <button onClick={(e) => (this.create(this.state.eventName, this.state.eventDescription))}>
                    Submit
                </button>

            </div>
        );
    }
}

export default CreateEvent;
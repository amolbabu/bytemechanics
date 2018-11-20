import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import firebase from "../fire";
import {Link} from 'react-router-dom';
import NaoNavigation from "./NaoNavigation";


class Home extends Component {

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.joinRoom()
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            eventId: ''
        }
    }

    joinRoom() {
        this.props.history.push('/vote?eventId=' + this.state.eventId);
    }

    updateInput(value) {
        this.setState({eventId: value});
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // this.setState({loggedIn})
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="voteheader">
                    <h1>Nao</h1>
                </div>
                <hr/><br/>
                <h3><Link to={"/login"}>Create Event</Link></h3> <br/>
                <br/>Or<br/><br/>
                Join a event with Event ID
                <div>
                    <input type="text" value={this.state.roomId}
                           onChange={(evt) => this.updateInput(evt.target.value)}
                           onKeyPress={this.handleKeyPress}
                           placeholder={"Event ID (e.g. TgE4a)"}/>
                    <Button bsStyle="success" type="submit"
                            onClick={() => this.joinRoom()}>Join Event</Button>
                </div>

            </div>
        );
    }
}

export default Home;
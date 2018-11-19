import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';


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

    render() {
        return (
            <header className="App-header">
                <label className="App-logo" alt="logo">Nao</label>
                <Link to={"/login"}> Create your Questions</Link> <br/>
                <center>or</center>
                Join a event with Event ID
                <div>
                    <input type="text" value={this.state.roomId}
                           onChange={(evt) => this.updateInput(evt.target.value)}
                           onKeyPress={this.handleKeyPress}
                           placeholder={"Event ID (e.g. TgE4a)"}/>
                    <Button bsStyle="success" type="submit" onClick={() => this.joinRoom()}>Join Event</Button>
                </div>
            </header>
        );
    }
}

export default Home;
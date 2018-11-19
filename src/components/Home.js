import React, { Component } from 'react';
import {Button} from "react-bootstrap";

class Home extends Component{



    constructor(props){
        super(props);
        this.state = {
            eventId: ''
        }
    }



    joinRoom(){
        this.props.history.push('/vote?eventId='+this.state.eventId);
    }

    updateInput(value){
        this.setState({eventId: value});
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
           this.joinRoom()
        }
    }

    render(){
        return (
            <header className="App-header">
                <label className="App-logo" alt="logo">NAO</label>
                    Create your Questions  <br/>
                <center>or</center>
                    Join a event with Event ID
                <div>
                    <input type="text" value={this.state.roomId}
                           onChange={(evt)=>this.updateInput(evt.target.value)}
                           onKeyPress={this.handleKeyPress}
                           placeholder={"Event ID (e.g. TgE4a)"}/>
                    <Button bsStyle="success" type="submit" onClick={()=>this.joinRoom()}>Join Event</Button>
                </div>
            </header>
        );
    }
}
export default Home;
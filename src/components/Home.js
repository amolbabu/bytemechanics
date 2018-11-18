import React, { Component } from 'react';
import {Button} from "react-bootstrap";

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            roomId: ''
        }
    }

    joinRoom(){
        this.props.history.push('/ask?roomId='+this.state.roomId);
    }

    updateInput(value){
        this.setState({roomId: value});
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
                    Create your Questions or <br/><br/>
                    Join a room with Room ID
                <div>
                    <input type="text" value={this.state.roomId}
                           onChange={(evt)=>this.updateInput(evt.target.value)}
                           onKeyPress={this.handleKeyPress}
                           placeholder={"Room ID (e.g. TgE4^a)"}/>
                    <Button bsStyle="success" type="submit" onClick={()=>this.joinRoom()}>Join Room</Button>
                </div>
            </header>
        );
    }
}
export default Home;
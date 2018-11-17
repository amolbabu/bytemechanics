import React, { Component } from 'react';
import fire from "../fire";
import {NavLink} from "react-router-dom"

class Ask extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })

        messagesRef.on('child_changed', snapshot =>{
            this.state.messages = [];
            snapshot.forEach(s =>{
                let message = { text: s.val(), id: s.key };
                this.setState({ messages: [message].concat(this.state.messages) });
            });
            // this.setState({ messages: sna });
        })


    }

    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( this.inputEl.value );
        this.inputEl.value = ''; // <- clear the input
    }
    render() {
        return (
            <div>
                <form onSubmit={this.addMessage.bind(this)}>
                    <input type="text" ref={ el => this.inputEl = el }/>
                    <input type="submit"/>
                    <ul>

                        { /* Render the list of messages */
                            this.state.messages.map( message => <li key={message.id}> <NavLink to={"/vote?sessionId="+message.id}> {message.text}</NavLink> </li> )
                        }
                    </ul>
                </form>
            </div>
        );
    }
}
export  default Ask;
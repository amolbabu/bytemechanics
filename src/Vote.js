import React, { Component } from 'react';
import fire from "./fire";

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').limitToLast(1);
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

    render() {
        return (
            <div>
                <form onSubmit={this.addMessage.bind(this)}>
                    <ul>
                        { /* Render the list of messages */
                            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
                        }
                    </ul>
                </form>
            </div>
        );
    }
}
export  default Vote
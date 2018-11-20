import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import firebase from "../fire";
import NaoNavigation from "./NaoNavigation";


class Vote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: {
                options: []
            }
        }
    }

    handleClick(index) {
        console.log(this.state.options[index])

        this.props.history.push('/')

    }

    componentWillMount() {
        /* Create reference to messages in Firebase Database */
        console.log("Component Will Mount");
        let messagesRef = firebase.database().ref('NAO/questions').limitToLast(1);
        console.log("messagesRef = " + messagesRef);

        var optionValueArray = [];
        messagesRef.on('child_added', snapshot => {
            //this.state.messages = [];
            console.log("Child Message");
            snapshot.forEach(s => {

                let questionRef = firebase.database().ref('/NAO/questions').orderByChild('eventId').equalTo("5qe74").limitToLast(1);
                questionRef.on('value', snapshot => {
                    snapshot.forEach(x => {
                        console.log(x.val())
                        this.setState({question: x.val()});
                    })
                });

            });
            // this.setState({ messages: sna });
        })
    }

    render() {

        return (
            <div className="container">
                <NaoNavigation/>
                <hr/>

                <div>
                    <h3>
                        {this.state.question.questionText}
                    </h3>
                    <br/>
                    <Panel class="panel-body" bsStyle="success">
                        <ListGroup>
                            {

                                this.state.question.options.forEach((option, index) => {
                                    return <ListGroupItem onClick={() => {
                                        this.handleClick(index)
                                        console.log(index)
                                    }}>{option}</ListGroupItem>
                                })

                            }
                        </ListGroup>

                    </Panel>

                </div>
            </div>
        );
    }

    // constructor(props) {
    //     super(props);
    //     let params = queryString.parse(this.props.location.search);
    //
    //     console.log(params)
    //     this.state = { messages: [] }; // <- set up react state
    // }
    // componentWillMount(){
    //     /* Create reference to messages in Firebase Database */
    //     let messagesRef = fire.database().ref('messages').limitToLast(1);
    //     messagesRef.on('child_added', snapshot => {
    //         /* Update React state when message is added at Firebase Database */
    //         let message = { text: snapshot.val(), id: snapshot.key };
    //         this.setState({ messages: [message].concat(this.state.messages) });
    //     })
    //
    //     messagesRef.on('child_changed', snapshot =>{
    //         this.state.messages = [];
    //         snapshot.forEach(s =>{
    //             let message = { text: s.val(), id: s.key };
    //             this.setState({ messages: [message].concat(this.state.messages) });
    //         });
    //         // this.setState({ messages: sna });
    //     })
    // }
    //
    // render() {
    //     return (
    //         <div>
    //             <form onSubmit={this.addMessage}>
    //                 <ul>
    //                     { /* Render the list of messages */
    //                         this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
    //                     }
    //                 </ul>
    //             </form>
    //         </div>
    //     );
    // }
}

export default Vote
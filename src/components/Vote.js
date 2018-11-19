import React, {Component} from 'react';
import {Label, ListGroup, ListGroupItem, Panel} from "react-bootstrap";


class Vote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionText: "Sample Question that is not very short. what happends her",
            options: [
                "option1",
                "option2",
                "option3",
                "option4",
                "option5",
            ]
        }
    }

    handleClick(index) {
        console.log(this.state.options[index])

        this.props.history.push('/')

    }

    /*componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log(user.email)
            }
            else{
                this.props.history.push("/login")
            }

        });
    }*/

    render() {
        return (
            <div className="container">
                <div class="voteheader">
                <h1>Vote with Nao</h1>
            </div>
                <hr/>

               <div>
                    <h3>
                        {this.state.questionText}?
                    </h3>
                    <br/>
                    <Panel class="panel-body" bsStyle="success">
                        <ListGroup>
                            {
                                this.state.options.map((option, index) => {
                                    return <ListGroupItem onClick={() => {
                                        this.handleClick(index)
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
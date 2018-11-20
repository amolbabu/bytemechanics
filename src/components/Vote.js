import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import firebase from "../fire";
import queryString from "query-string";
import NaoNavigation from "./NaoNavigation";


class Vote extends Component {

    constructor(props) {
        super(props);

        var params = queryString.parse(this.props.location.search);

        this.state = {
            questionKey: "",
            question: {
                options: []
            },
            voted: false,
            eventId: params['eventId']
        }

    }

    handleClick(index) {

        if (!this.state.voted) {
            this.state.question.options[index].count = this.state.question.options[index].count + 1;
            firebase.database().ref("/NAO/questions/" + this.state.questionKey + "/options").set(this.state.question.options).then(
                this.setState({voted: true})
            )
        }

    }

    componentWillMount() {
        /* Create reference to messages in Firebase Database */
        console.log("Component Will Mount");
        let messagesRef = firebase.database().ref('NAO/questions').limitToLast(1);
        console.log("messagesRef = " + messagesRef);

        messagesRef.on('child_added', snapshot => {
            snapshot.forEach(s => {

                let questionRef = firebase.database().ref('/NAO/questions').orderByChild('eventId').equalTo(this.state.eventId).limitToLast(1);
                questionRef.on('value', snapshot => {
                    snapshot.forEach(x => {
                        if (x.key != this.state.questionKey) {
                            this.setState({questionKey: x.key, voted:false})
                        }
                        this.setState({question: x.val()});
                    })
                });
            });
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
                    <Panel className="panel-body" bsStyle="success">
                        <ListGroup>
                            {
                                this.state.question.options.map((opt, index) => {
                                    if (this.state.voted) {
                                        return <ListGroupItem disabled key={index}
                                                              onClick={() => this.handleClick(index)}>{opt.text}</ListGroupItem>
                                    }
                                    else {
                                        return <ListGroupItem key={index}
                                                              onClick={() => this.handleClick(index)}>{opt.text}</ListGroupItem>
                                    }
                                })
                            }

                        </ListGroup>
                    </Panel>

                </div>
            </div>
        );
    }
}

export default Vote
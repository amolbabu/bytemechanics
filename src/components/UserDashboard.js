import React, { Component } from 'react';
import {Button, Panel} from "react-bootstrap";
import firebase from "../fire";
import {Link} from 'react-router-dom';


class UserDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            events: [{
                heading: '111',
                eventId: 1
            },{
                heading: "22",
                eventId: 2
            }]
        }
    }


    componentDidMount() {

        let user = firebase.auth().currentUser;
        if(user){
            this.setState({email: user.email});
        }else{
           // console.log(user.email)
        }

        console.log(this.state.email.length)
        if(this.state.email.length >0){
            let questionRef =firebase.database().ref('/NAO/event').orderByChild('createdBy').equalTo('test');
            questionRef.on('value', snapshot=> {
                snapshot.forEach(data=>{
                    console.log(data.val())
                    this.setState({events: [data.val()].concat(this.state.events)})
                })

            });
        }

    }

    render(){
        return (
            <div className="container">
                <h3>Past Events </h3>
                {this.state.events.map(event=>{
                    console.log("$$$$")
                    return (
                        <Panel bsStyle="primary">
                            <Panel.Heading>
                                <Link to={"/event-summary?eventId="+event.eventId}>
                                    <Panel.Title componentClass="h3">{event.heading}</Panel.Title>
                                </Link>
                            </Panel.Heading>
                            <Panel.Body>Panel content</Panel.Body>
                        </Panel>

                    );
                })}

            </div>
        );
    }
}
export default UserDashboard;
import React, { Component } from 'react';
import firebase from "../fire";
import {Link} from "react-router-dom";

class NaoNavigation  extends Component {

    logout() {
        firebase.auth().signOut().then(function () {
            console.error('Sign Out');
            window.location.reload();
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    createEventRedirect(){
        this.props.history.push("/create-event")
    }

    dashboardRedirect(){
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <body>
            <div className="voteheader">
                <h1>Nao</h1>
            </div>
            <div className="logoutheader">
                <strong>
                    <Link to={"/"}>Home</Link> |
                    <Link to={"/create-event"}>Create Event</Link> |
                    <Link to={"/dashboard"}>Dashboard</Link> |
                    <a href="#" onClick={(e) => (this.logout())}>Logout</a></strong> |
            </div>
            </body>
        );
    }
}

export default NaoNavigation
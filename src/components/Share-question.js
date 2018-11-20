import React, {Component} from "react";
import QRCode from 'qrcode.react';


class ShareQuestion extends Component{

    constructor(props){
        super(props);
        this.state = {
            eventId: props.eventId
        }
    }

    render(){
        return (
            <div>
                <center><QRCode value={"http://collective-intelligence-f2bb1.firebaseapp.com/vote?eventId="+this.state.eventId} renderAs={"svg"} /></center>
            </div>
        );
    }
}
export default ShareQuestion;
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

            /*Value is just an example*/
            <div>
                <h3>Share Your Question!</h3>
                <QRCode value={"http://collective-intelligence-f2bb1.firebaseapp.com/vaote?eventId="+this.state.eventId} renderAs={"svg"} />
                <h5>Or share this Url: http://collective-intelligence-f2bb1.firebaseapp.com/vote?eventId={this.state.eventId}</h5>
            </div>
        );
    }
}
export default ShareQuestion;
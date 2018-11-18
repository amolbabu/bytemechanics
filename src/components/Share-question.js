import React, {Component} from "react";
import QRCode from 'qrcode.react';


class ShareQuestion extends Component{

    constructor(props){
        super(props);
        this.state = {
            sessionId: 'ZFlUcF6BUQ'
        }
    }

    render(){
        return (

            /*Value is just an example*/
            <div>
                <h3>Share Your Question!</h3>
                <QRCode value={"http://facebook.com"} renderAs={"svg"} />
                <h5>Or share this Url: http://{this.state.sessionId}</h5>
            </div>
        );
    }
}
export default ShareQuestion;
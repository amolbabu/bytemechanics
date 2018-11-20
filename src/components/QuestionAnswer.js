import React, { Component } from 'react';
import {Button, Col, Panel, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import './QuestionAnswer.css'

import {Link} from 'react-router-dom';


class QuestionAnswer extends Component{
    constructor(props){
        super(props);
        this.state ={
            questionId: props.question.questionId,
            questionText: props.question.questionText,
            options: props.question.options,
        }
    }

    render(){
        return (
            <div>
                <Panel >

                        <Panel.Heading bsStyle="warning">
                            <table width="100%">
                                <tr>
                                    <td width="70%">
                                        <Link to={"/question-result?questionId="+this.state.questionId}> {this.state.questionText}</Link>
                                    </td>
                                    <td width="15%" className={"poll-button-td"}>
                                        <Button bsSize="xsmall" bsStyle={"success"}>Start Poll</Button>
                                    </td>
                                    <td bsStyle={"danger"} width="15%" className={"poll-button-td"}>
                                        <Button bsSize={"xsmall"} bsStyle={"danger"}>End Poll</Button>
                                    </td>
                                </tr>
                            </table>
                            </Panel.Heading>
                        <ul>
                        {
                            this.state.options.map(opt => <li key={opt.text}>{opt.text}</li>)
                        }
                    </ul>
                </Panel>

            </div>
        );
    }
}
export default QuestionAnswer
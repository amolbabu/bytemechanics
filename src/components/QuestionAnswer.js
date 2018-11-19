import React, { Component } from 'react';
import {Button,Form, Panel, FormControl, ControlLabel, FormGroup} from "react-bootstrap";


import {Link} from 'react-router-dom';


class QuestionAnswer extends Component{
    constructor(props){
        super(props);
        this.state ={
            questionText: props.question.questionText,
            options: props.question.options,
        }
    }


    render(){
        return (
            <div>
                <Panel >
                    <Link to={"/question-result?sessionId="+123}>
                        <Panel.Heading bsStyle="warning">{this.state.questionText}</Panel.Heading>
                    </Link>
                        <ul>
                        {
                            this.state.options.map(opt => <li key={opt}>{opt}</li>)
                        }
                    </ul>
                </Panel>

            </div>
        );
    }
}
export default QuestionAnswer
import React, { Component } from 'react';
import {Button, Form, Panel, FormControl, ControlLabel, FormGroup} from "react-bootstrap";


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
                    <Link to={"/question-result?questionId="+this.state.questionId}>
                        <Panel.Heading bsStyle="warning">{this.state.questionText}</Panel.Heading>
                    </Link>
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
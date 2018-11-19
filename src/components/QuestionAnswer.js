import React, { Component } from 'react';
import {Button,Form, Panel, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import AddQuestion from './AddQuestion'


class QuestionAnswer extends Component{
    constructor(props){
        super(props);
        this.state ={
            questionText: props.question.questionText,
            options: props.question.options

        }
    }

    handleClick() {
        console.log(this.props)
        // this.props.history.push('/question-result');
    }


    render(){
        return (
            <div>
                <Panel  bsStyle="warning">
                    <Panel.Heading onClick={this.handleClick.bind(this)}>{this.state.questionText}</Panel.Heading>
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
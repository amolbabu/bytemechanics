import React, { Component } from 'react';
import fire from "../fire";
import {NavLink} from "react-router-dom"
import { Button, Glyphicon } from 'react-bootstrap';
import ShareQuestion from './Share-question';
import QuestionAnswer from './QuestionAnswer';
import AddQuestion from "./AddQuestion";

class Ask extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [

            ] ,
            questions: [
                {
                        questionText: "Testing Question",
                        options: [
                            "Option1",
                            "Option 100"
                        ]
                    },
                    {
                        questionText: "Testing Question2",
                        options: [
                            "Option1",
                            "Option 220"
                        ]
                    }
            ]
        }; // <- set up react state
    }


    addQuestion(question){

        this.state.questions.push(question)

        this.setState({questions: this.state.questions});
    }

    render() {

        return (
            <div>
                {
                    this.state.questions.map(question => <QuestionAnswer question={question} key={question.questionText}/>)
                }

                <AddQuestion addQuestion={this.addQuestion.bind(this)} />

                <ShareQuestion />
            </div>
        );
    }
}
export  default Ask;
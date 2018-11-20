import React, { Component } from 'react';
import {Button, Form, Col, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import Popup from "reactjs-popup";
import firebase from '../fire'


class AddQuestion extends Component{

    constructor(props) {
        super(props)
        this.state ={
            eventId: props.eventId,
            questionText: '',
            email: '',
            options: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
            }
        }
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if(user){
            this.setState({user: user, email: user.email});
        }else{

        }
    }

    handleQestionInput( value){
        this.setState({questionText: value})
    }

    handleOptionInput(index, value){
        this.state.options[index] = value
        this.setState({options: this.state.options})
    }

    pushQuestionToParent(){

        var opt =[]
        var optsObj = this.state.options


        Object.keys(optsObj).forEach(function(key) {
            var value = optsObj[key];
            if(value!==''){
                opt.push(
                    {
                        text: value,
                        count: 0
                    }
                );
            }
        });



        var q = {
            questionId: this.generateQuestionId(),
            questionText: this.state.questionText,
            options: opt,
            eventId: this.state.eventId,
            voteNow: false,
            createdBy: this.state.email,
            createdAt: new Date()
    }


        var ref = firebase.database().ref('/NAO/questions');
        ref.push(q);


        this.props.addQuestion(q);

        this.state.options= {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
        }
    }

    generateQuestionId() {
        return Math.random().toString(36).substr(2, 5);
    }

    render(){


        return (
            <div className="container">
            <Popup
                trigger={<Button className="button" bsStyle={"success"}> Create Question </Button>}
                modal
                closeOnDocumentClick
            >
                {close =>(

                    <form>

                        <FormGroup controlId="options1" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Question
                            </Col>
                            <Col  sm={10}>
                                <FormGroup controlId="question" >
                                    <FormControl componentClass="textarea" placeholder="Add Your Question Here" onChange={(evt)=>this.handleQestionInput(evt.target.value)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="options1" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Options<br/>
                                (Max 5)
                            </Col>
                            <Col  sm={10}>
                                <FormControl type="text"   onChange={(evt)=>this.handleOptionInput(1, evt.target.value)} />
                                <FormControl type="text"   onChange={(evt)=>this.handleOptionInput(2, evt.target.value)} />
                                <FormControl type="text"   onChange={(evt)=>this.handleOptionInput(3, evt.target.value)} />
                                <FormControl type="text"   onChange={(evt)=>this.handleOptionInput(4, evt.target.value)} />
                                <FormControl type="text"   onChange={(evt)=>this.handleOptionInput(5, evt.target.value)} />

                            </Col>
                        </FormGroup>

                        <Button bsStyle={"success"} onClick={()=>{
                            this.pushQuestionToParent();
                            close();
                        }
                        }>Add</Button>

                    </form>
                )}


            </Popup></div>
        );
    }
}
export default AddQuestion
import React, { Component } from 'react';
import {Button, Form, Col, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import Popup from "reactjs-popup";


class AddQuestion extends Component{

    constructor(props) {
        super(props)
        this.state ={
            questionText: '',
            options: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
            }
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
                opt.push(value);
            }
        });



        var q = {
            questionText: this.state.questionText,
            options: opt
        }
        this.props.addQuestion(q)
        this.state.options= {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
        }
    }

    render(){


        return (

            <Popup
                trigger={<Button className="button" bsStyle={"success"}> Create Question </Button>}
                modal
                closeOnDocumentClick
            >
                {close =>(
                    <form horizontal="true">
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


            </Popup>
        );
    }
}
export default AddQuestion
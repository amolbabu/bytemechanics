import React, { Component } from 'react';
import {Button,Form,Col, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import Popup from "reactjs-popup";


class AddQuestion extends Component{


    render(){
        return (
            <Popup
                trigger={<button className="button"> Open Modal </button>}
                modal
                closeOnDocumentClick
            >
                <div>
                    <form horizontal>
                        <FormGroup controlId="options1" >
                        <Col componentClass={ControlLabel} sm={2}>
                            Question
                        </Col>
                        <Col  sm={10}>
                            <FormGroup controlId="question" >
                                <FormControl componentClass="textarea" placeholder="Add Your Question Here" />
                            </FormGroup>
                        </Col>
                        </FormGroup>

                        <FormGroup controlId="options1" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Options<br/>
                                max 5
                            </Col>
                            <Col  sm={10}>
                                    <FormControl type="text"   onChange={this.handleChange} />
                                    <FormControl type="text"   onChange={this.handleChange} />
                                    <FormControl type="text"   onChange={this.handleChange} />
                                    <FormControl type="text"   onChange={this.handleChange} />
                                    <FormControl type="text"   onChange={this.handleChange} />
                            </Col>
                        </FormGroup>

                        <Button bsStyle={"success"}>Add</Button>



                    </form>

                </div>

            </Popup>
        );
    }
}
export default AddQuestion
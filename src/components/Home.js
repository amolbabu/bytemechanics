import React, { Component } from 'react';
import Ask from "./Ask";

class Home extends Component{

    render(){
        return (
            <header className="App-header">
                <label className="App-logo" alt="logo">NAO</label>
                Create your Questions!
                <Ask/>
            </header>
        );
    }
}
export default Home;
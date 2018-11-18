import React, { Component } from 'react';
import './App.css';
import  Vote from './components/Vote';
import Ask from './components/Ask';
import Home from './components/Home';
import Error from './components/Error';
import Login from './components/Login';
import Propose from './components/Propose';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/ask" component={Ask}/>
                    <Route path="/vote" component={Vote}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/propose" component={Propose}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

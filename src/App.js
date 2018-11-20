import React, {Component} from 'react';
import './App.css';
import Vote from './components/Vote';
import CreateQuestion from './components/CreateQuestion';
import Home from './components/Home';
import Error from './components/Error';
import Login from './components/Login';
import Propose from './components/Propose';
import SignUp from './components/Registration';
import QuestionResult from './components/QuestionResult'
import CreateEvent from './components/CreateEvent'


import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserDashboard from "./components/UserDashboard";
import EventSummary from "./components/EventSummary";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/create-question" component={CreateQuestion}/>
                    <Route path="/vote" component={Vote}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/propose" component={Propose}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/question-result" component={QuestionResult}/>
                    <Route path="/create-event" component={CreateEvent}/>
                    <Route path="/dashboard" component={UserDashboard}/>
                    <Route path="/event-summary" component={EventSummary}/>
                    <Route component={Error}/>npm
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

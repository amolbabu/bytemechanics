import React, {Component} from 'react';
import firebase from "../fire";
import ShareQuestion from './Share-question';
import QuestionAnswer from './QuestionAnswer';
import AddQuestion from "./AddQuestion";
import queryString from 'query-string';


class CreateQuestion extends Component {

    constructor(props) {


        super(props);

        let params = queryString.parse(this.props.location.search);
        var eventId = params['eventId'];

        this.state = {
            eventId: eventId,
            event: {
                heading: '',
                description: '',

            },
            questions: []
        }; // <- set up react state

    }


    addQuestion(question) {

        this.state.questions.push(question)

        this.setState({questions: this.state.questions});
    }

    componentDidMount() {
        // Check if login user
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
            }
            else {
                this.props.history.push("/login")
            }

        });

        // fetch correct event
        let event = firebase.database().ref('/NAO/event').orderByChild('eventId').equalTo(this.state.eventId);

        event.on('value', snapshot => {
            snapshot.forEach(x => {
                console.log(x.val())
                this.setState({event: x.val()})
            })
        });

        //fetch the questions associated with event
        let questionRef = firebase.database().ref('/NAO/questions').orderByChild('eventId').equalTo(this.state.eventId);
        questionRef.on('value', snapshot => {
            let qns = []
            snapshot.forEach(x => {
                qns.push(x.val());
            })
            this.setState({questions: qns});
        });

    }

    logout() {
        firebase.auth().signOut().then(function () {
            console.error('Sign Out');
            window.location.reload();
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    render() {

        return (
            <div className="container">
                <div className="internalheader">
                    <h1>Nao</h1>
                </div>
                <div className="logoutheader">
                    <strong><a href="#" onClick={(e) => (this.logout())}>
                        Logout</a></strong>
                </div>
                <h3>{this.state.event.heading}</h3>
                <h5>{this.state.event.description}</h5>
                <h4>Questions asked: </h4>
                {
                    this.state.questions.map(question => <QuestionAnswer question={question}
                                                                         key={question.questionId}/>)
                }

                <AddQuestion addQuestion={this.addQuestion.bind(this)} eventId={this.state.eventId}/>

                <ShareQuestion eventId={this.state.eventId}/>
            </div>
        );
    }
}

export default CreateQuestion;
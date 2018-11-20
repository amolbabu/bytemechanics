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
                <hr/>
                <table width="100%">
                    <tr>
                        <td width="50%"><tr>
                            <td><label className="createQuestionName">Event Name : </label><span width="100%">{this.state.event.heading}</span></td>
                        </tr>
                            <tr>
                                <td><label className="createQuestionName">Description : </label><span width="100%">{this.state.event.description}</span></td>
                            </tr></td>
                        <td width="50%" allign="right"><ShareQuestion eventId={this.state.eventId}/></td>
                    </tr>

                </table>
                <br/>
                <label class="createQuestionName">Event-ID : </label> {this.state.eventId}
                <h5><label className="createQuestionName">Vote Url : </label> http://collective-intelligence-f2bb1.firebaseapp.com/vote?eventId={this.state.eventId}</h5>

                <hr/>
                <h4>Questions asked: </h4>
                {
                    this.state.questions.map(question => <QuestionAnswer question={question}
                                                                         key={question.questionId}/>)
                }

                <AddQuestion addQuestion={this.addQuestion.bind(this)} eventId={this.state.eventId}/>


            </div>
        );
    }
}

export default CreateQuestion;
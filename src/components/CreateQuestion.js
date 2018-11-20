import React, {Component} from 'react';
import firebase from "../fire";
import ShareQuestion from './Share-question';
import QuestionAnswer from './QuestionAnswer';
import AddQuestion from "./AddQuestion";
import queryString from 'query-string';
import NaoNavigation from "./NaoNavigation";


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
            questions: [],
            host: window.location.hostname
        }; // <- set up react state

        console.log(this.state.host)

    }


    addQuestion(question) {

        this.state.questions.push(question)

        this.setState({questions: this.state.questions});
    }

    componentDidMount() {
        if(window.location.hostname === 'localhost'){
            this.setState({host: "http://localhost:3000"})
        }
        else{
            this.setState({host: window.location.hostname})
        }

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
                <NaoNavigation/>
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
                <label className="createQuestionName">Event-ID : </label> {this.state.eventId}
                <h5><label className="createQuestionName">Vote Url : </label>
                    <a target="_blank" href={this.state.host+"/vote?eventId="+this.state.eventId}> {this.state.host+"/vote?eventId="+this.state.eventId}</a></h5>

                <hr/>
                <AddQuestion addQuestion={this.addQuestion.bind(this)} eventId={this.state.eventId}/>
                <h4>Questions asked: </h4>
                {
                    this.state.questions.map(question => <QuestionAnswer question={question}
                                                                         key={question.questionId}/>)
                }




            </div>
        );
    }
}

export default CreateQuestion;
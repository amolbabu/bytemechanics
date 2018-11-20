import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {VerticalBarSeries, XYPlot, XAxis, YAxis, LabelSeries} from "react-vis/es";
import {DEFAULT_MARGINS as margin} from "react-vis/es/utils/chart-utils";
import './QuestionResult.css'
import queryString from "query-string";
import firebase from "../fire";

class QuestionResult extends Component {

    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        // var eventId = params['eventId'];
        var questionId = params['questionId'];

        this.state = {
            questionId: questionId,
            questionText: '',
            data: []
        }
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

        //fetch the question associated with questionId
        let questionRef = firebase.database().ref('/NAO/questions').orderByChild('questionId').equalTo(this.state.questionId);
        questionRef.on('value', snapshot => {
            let qn = []
            let data_temp = []
            snapshot.forEach(x => {
                qn.push(x.val());
            })
            this.setState({questionText: qn[0].questionText});
            // console.log("aaaaaaaaaaaaaaaaaa")
            // console.log(qn[0].options[0].count)
            // console.log(qn[0].options[0].text)

            for(var i=0; i < qn[0].options.length; i++){
                data_temp.push({y: qn[0].options[i].count, x: i, text: qn[0].options[i].text});
                // console.log(data_temp)
            }
            this.setState({
                data: data_temp
            })
            console.log(this.state)
        });
    }

    static getColor(index) {
        var color = ["pink", "yellow", "red", "blue", "orange", "green"]
        return color[index];
    }

    render() {
        this.state.data.sort((a, b) => {
            return a.x - b.x
        }).map(d => {
            console.log("sorted: " + d)
        })

        const chartWidth = window.innerWidth * .7;
        const chartHeight = 500;
        const chartDomain = [0, chartHeight];

        return (
            <header className="App-header">
                <div>
                    <h3>{this.state.questionText}</h3>

                    <XYPlot
                        xType="ordinal"
                        width={chartWidth}
                        height={chartHeight}
                        yDomain={chartDomain}
                    >
                        <VerticalBarSeries
                            data={this.state.data}
                            colorType="literal"
                            getColor={d => {
                                // console.log("index:" + d.x)
                                return QuestionResult.getColor(d.x);
                            }}
                        />

                        <LabelSeries
                            data={this.state.data.map(obj => {
                                return {...obj, label: obj.y.toString()}
                            })}
                            style={{fill: 'white'}}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"
                        />
                    </XYPlot>
                    <br/>
                    <br/>

                    {this.state.data.sort((a, b) => {
                        return a.x - b.x
                    }).map(d => {
                        return (
                            <table className={"legend-row"}>
                                <tr>
                                    <td width="50px" bgcolor={QuestionResult.getColor(d.x)}/>
                                    <td width="30px"/>
                                    <td>{d.text}</td>
                                </tr>
                            </table>)

                    })}
                </div>
            </header>
        );
    }
}

export default QuestionResult;
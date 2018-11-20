import React, {Component} from "react";
import {LabelSeries, VerticalBarSeries, XYPlot} from "react-vis/es";
import './QuestionResult.css'
import queryString from "query-string";
import firebase from "../fire";
import NaoNavigation from "./NaoNavigation";

class QuestionResult extends Component {

    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        var questionId = params['questionId'];

        this.state = {
            questionId: questionId,
            questionText: '',
            data: [],
            chartDomainHeight: 5
        }
    }

    static getColor(index) {
        var color = ["pink", "yellow", "red", "blue", "orange", "green"]
        return color[index];
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
            }
            else {
                this.props.history.push("/login")
            }
        });

        let questionRef = firebase.database().ref('/NAO/questions').orderByChild('questionId').equalTo(this.state.questionId);
        questionRef.on('value', snapshot => {
            let qn = []
            let tempChartDomainHeight = this.state.chartDomainHeight
            let data_temp = []
            snapshot.forEach(x => {
                qn.push(x.val());
            })
            this.setState({questionText: qn[0].questionText});
            for (var i = 0; i < qn[0].options.length; i++) {
                data_temp.push({y: qn[0].options[i].count, x: i, text: qn[0].options[i].text});
                if(qn[0].options[i].count>tempChartDomainHeight){
                    tempChartDomainHeight = qn[0].options[i].count
                }
            }
            this.setState({
                data: data_temp,
                chartDomainHeight: tempChartDomainHeight
            })
        });
    }

    render() {
        this.state.data.sort((a, b) => {
            return a.x - b.x
        }).map(d => {
            console.log("sorted: " + d)
        })

        const chartWidth = 800;
        const chartHeight = 500;
        const chartDomain = [0, this.state.chartDomainHeight * 1.2];

        return (
            <div className="container">
                <NaoNavigation/>
                <hr/>
                <h3>Question: {this.state.questionText}</h3>

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
                <hr/>
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
        );
    }
}

export default QuestionResult;
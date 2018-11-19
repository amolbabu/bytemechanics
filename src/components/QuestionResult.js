import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {VerticalBarSeries, XYPlot, XAxis, YAxis, LabelSeries} from "react-vis/es";
import {DEFAULT_MARGINS as margin} from "react-vis/es/utils/chart-utils";
import './QuestionResult.css'
import queryString from "query-string";

class QuestionResult extends Component {

    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);

        console.log('sessionId ' + params['sessionId'])
        this.state = {
            data: [
                {"y": 55, "x": "1", "text": "test"},
                {"y": 55, "x": "5", "text": "6666"},
                {"y": 33, "x": "2", "text": "ddd"}
            ]
        }
    }

    componentDidMount() {
        this.setState({
            data: [
                {"y": 55, "x": "1", "text": "test"},
                {"y": 55, "x": "5", "text": "6666"},
                {"y": 33, "x": "2", "text": "ddd"}
            ]
        })
    }

    static getColor(index) {
        var color = ["pink", "yellow", "red", "blue", "orange", "green"]
        return color[index - 1];
    }

    // this.state.data.map((d, index)=> {
    // console.log("index:" + index)
    render() {

        this.state.data.sort((a, b) => {
            return a.x - b.x
        }).map(d => {
            console.log(d)
        })


        const chartWidth = window.innerWidth * .7;
        const chartHeight = 500;
        const chartDomain = [0, chartHeight];

        return (
            <header className="App-header">
                <div>
                    <h3>Question test</h3>

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
                                console.log("index:" + d.x)
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
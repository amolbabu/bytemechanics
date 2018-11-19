import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {VerticalBarSeries, XYPlot, XAxis, YAxis, LabelSeries} from "react-vis/es";
import {DEFAULT_MARGINS as margin} from "react-vis/es/utils/chart-utils";
import './QuestionResult.css'

class QuestionResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {"y": 100, "x": "1"},
                {"y": 112, "x": "2"},
                {"y": 230, "x": "3"},
                {"y": 268, "x": "4"},
                {"y": 300, "x": "5"}
            ]
        }
    }

    static getColor(index){
        var color=["pink", "yellow", "red", "blue", "orange", "green"]
        return color[index-1];
    }

    render() {

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
                        {/*<XAxis/>*/}
                        {/*<YAxis/>*/}
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
                            style={{fill:'white'}}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"

                        />
                    </XYPlot>
                </div>
            </header>
        );
    }
}

export default QuestionResult;
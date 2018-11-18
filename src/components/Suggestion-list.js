import React, {Component} from 'react';
import { Button, Glyphicon, Table } from 'react-bootstrap';
import './Suggestion-list.css'

class SuggestionList extends Component {

    constructor(props) {
        super(props)

        console.log(props.size)
        this.state = {
            suggestions: [
                {
                    'text': 'buy more gold',
                    'up_vote': 12,
                    'down_vote': 9,
                    'by': 'anonymous'
                },
                {

                    'text': 'Sell Equities test and another thing is a secret agent thus weird',
                    'up_vote': 10,
                    'down_vote': 3,
                    'by': 'anonymous'
                },
                {

                    'text': 'Becareful of forex',
                    'up_vote':8,
                    'down_vote': 3,
                    'by': 'anonymous'
                },
                {

                    'text': 'Interst rate is dangerous',
                    'up_vote': 5,
                    'down_vote': 0,
                    'by': 'anonymous'
                },

            ]
        }
    }

    upVote(index){
        this.state.suggestions[index].up_vote++;
        this.setState({suggestions: this.state.suggestions});
    }

    downVote(index){
        this.state.suggestions[index].down_vote++;
        this.setState({suggestions: this.state.suggestions});
    }

    effectiveVote(a, b){
        return (b.up_vote - b.down_vote) - (a.up_vote - a.down_vote);
    }

    render() {
        return (
            <div className={"suggestion-column"}>
                {
                    this.state.suggestions.sort(this.effectiveVote).map((suggestion, index)  =>
                        <div className={"suggestion-row"} key={suggestion.text}>
                            <table width="100%">
                                <tbody>
                                    <tr key={suggestion.text} >
                                        <td colSpan={3} className={"suggestion-text"}>
                                            {suggestion.text}
                                        </td>
                                    </tr>
                                    <tr className={"suggestion-rating"}>
                                        <td onClick={()=>{this.upVote(index)}} className={"clickable"}><Glyphicon glyph="thumbs-up"/> {suggestion.up_vote} </td>
                                        <td onClick={()=>{this.downVote(index)}} className={"clickable"}><Glyphicon glyph="thumbs-down" /> {suggestion.down_vote}</td>
                                        <td>By: {suggestion.by}</td>
                                    </tr>
                                </tbody>
                            </table>

                            </div>)
                }
            </div>

        );
    }
}

export default SuggestionList;
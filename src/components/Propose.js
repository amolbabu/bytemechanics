import React, { Component } from 'react';
import fire from "../fire";
import queryString from 'query-string';
import Columns from 'react-columns';
import SuggestionList from './Suggestion-list'
import "./Propose.css"

class Propose extends Component {

    constructor(props){
        super(props);
        let params = queryString.parse(this.props.location.search);

        console.log( params['sessionId']);
        this.state= {
            sessionId: params,

        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>What to do during a recession?</h1>
                </div>
                <Columns columns={2}>
                    <div>
                        <p className={"top-votes"}>Top Votes</p>
                        <SuggestionList size={6}/>
                    </div>
                    <div>
                        <p className={"new-votes"}>Newer Votes</p>
                        <SuggestionList size={10}/>
                    </div>
                </Columns>
            </div>
        );
    }
}
export default Propose
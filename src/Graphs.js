import React from 'react';

export class Graphs extends React.Component{
    render() {
        return <div>
            {this.props.graphs
            .map(g => <button onClick={() => this.props.render(g)} key={g.label}> {g.label} </button>)}
            <button onClick={this.props.reset}>reset</button>
        </div>
    }
}
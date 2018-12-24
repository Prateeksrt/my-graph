import React, {Component} from 'react';
import {Canvas} from "./Canvas";
import {Controls} from "./Controls";
import {Config} from "./Controls/config"
import './App.css'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height:0,
            gridDensity:10,
            cellWidth: 1,
            cellDivision: 5,
        };
        this.data =  Array.from(Array(200).keys()).map(a => ((a + 1)/10) - 10)
    }

    updateWindowDimensions() {
        this.ratio =  window.innerWidth/window.innerHeight;
        const height = window.innerHeight - 100;
        this.setState({
            width: height * this.ratio,
            height:height,
        });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', () => this.updateWindowDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateWindowDimensions());
    }

    sliderControl() {
        return Object.keys(Config)
            .filter(key => Config[key].type === 'slider')
            .reduce((a, c) => Object.assign(a, {[c]: this.state[c]}), {})
    }

    handleChange(a){
        this.setState(a);
    }

    graphs() {
        return [
            {
                func: (d) => Math.cos(d).toFixed(2),
                label: "cos",
                color: "red",
            },
            {
                func: (d) => Math.sin(d).toFixed(2),
                label: "sin",
                color: "green",
            },
            {
                func: (d) => Math.tan(d).toFixed(2),
                label: "tan",
                color: "blue",
            },
            {
                func: (d) => Math.pow(d, 2).toFixed(2),
                label: "x^2",
                color: "red"
            },
            {
                func: (d) => (1/d).toFixed(2),
                label: "x^-1",
                color: "blue"
            },
            {
                func: (d) => (d + 2).toFixed(2),
                label: "x + 2",
                color: "pink"
            }
        ];
    }

    render() {
        const {width, height, gridDensity, cellWidth, cellDivision} = this.state;
        return <div className="container">
            <Canvas className="canvas" width={width} height={height} xDomain={gridDensity * this.ratio}
                       yDomain={gridDensity} margin={5}
                       data={this.data}
                       graphs={this.graphs()}
                       cellWidth={cellWidth} cellDivision={cellDivision}
        />
        <Controls className="control" context={this.sliderControl()} onChange={(a) => this.handleChange(a)} config={Config}/>
        </div>
    }
}

export default App;

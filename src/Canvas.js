import React from 'react';
import * as d3 from "d3";
import './Canvas.css'
import {Graphs} from "./Graphs";

export class Canvas extends React.Component {
    resetCanvas() {
        this.g.remove();
    }

    initializeCanvas() {
        const {width, height, xDomain, yDomain, margin} = this.props;
        const svg = d3.select(this.node);
        this.xScale = d3.scaleLinear()
            .domain([-xDomain, xDomain])
            .range([0, width - margin * 2]);
        this.yScale = d3.scaleLinear()
            .domain([-yDomain, yDomain])
            .range([height - margin * 2, 0]);

        this.g = svg.append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")");

        this.initializeAxis();
        this.initializeGrid();
        this.initializeSubGrid();
    }

    initializeAxis() {
        const {xDomain, yDomain} = this.props;

        this.g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + this.xScale(0) + ",0)")
            .call(d3.axisLeft(this.yScale).ticks(yDomain * 2));

        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.yScale(0) + ")")
            .call(d3.axisBottom(this.xScale).ticks(xDomain * 2));
    }

    initializeGrid() {
        const {xDomain, yDomain, cellWidth} = this.props;
        this.xGrid(parseInt(xDomain/cellWidth), 'grid', cellWidth);
        this.yGrid(parseInt(yDomain/cellWidth), 'grid', cellWidth);
    }

    initializeSubGrid() {
        const {xDomain, yDomain, cellWidth, cellDivision} = this.props;
        this.xGrid(parseInt(xDomain/cellWidth * cellDivision), 'subGrid', cellWidth/cellDivision);
        this.yGrid(parseInt(yDomain/cellWidth * cellDivision), 'subGrid', cellWidth/cellDivision);
    }

    xGrid(numberOfLines, name, gap) {
        const {xDomain, yDomain} = this.props;
        let xGrid = this.g.append("g")
            .attr("class", name);
        Canvas.range(0, yDomain, gap)
            .forEach( a => {
                xGrid.append("line")
                    .attr("x1", this.xScale(-xDomain))
                    .attr("y1", this.yScale(a))
                    .attr("x2", this.xScale(xDomain))
                    .attr("y2", this.yScale(a));
                xGrid.append("line")
                    .attr("x1", this.xScale(-xDomain))
                    .attr("y1", this.yScale(-a))
                    .attr("x2", this.xScale(xDomain))
                    .attr("y2", this.yScale(-a));
            })
    }

    yGrid(numberOfLines, name, gap) {
        const {yDomain, xDomain} = this.props;
        let yGrid = this.g.append("g")
            .attr("class", name);
        Canvas.range(0, xDomain, gap)
            .forEach( a => {
                yGrid.append("line")
                    .attr("x1", this.xScale(a))
                    .attr("y1", this.yScale(-yDomain))
                    .attr("x2", this.xScale(a))
                    .attr("y2", this.yScale(yDomain));
                yGrid.append("line")
                    .attr("x1", this.xScale(-a))
                    .attr("y1", this.yScale(-yDomain))
                    .attr("x2", this.xScale(-a))
                    .attr("y2", this.yScale(yDomain));
            })
    }

    static range(start = 0, end, step) {
        const array = [];
        let value = start;
        while(value < end) {
            array.push(value);
            value += step
        }
        return array;
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    componentDidUpdate(){
        this.resetCanvas()
        this.initializeCanvas();
    }

    addGraph(graph){
        this.g.append("path")
            .attr("class", "graph")
            .datum(graph.data ? graph.data : this.props.data)
            .attr("d", d3.line()
                .x(d => this.xScale(d))
                .y(d => this.yScale(graph.func(d))))
            .attr("fill", "none")
            .attr("stroke", graph.color);
    }

    reset() {
        this.g.selectAll(".graph").remove();
    }

    render() {
        return <div>
            <svg ref={node => this.node = node}
                 width={this.props.width}
                 height={this.props.height}
                 className='graph'/>
            <Graphs graphs={this.props.graphs}
                    render={(g) => this.addGraph(g)}
                    reset={() => this.reset()}/>
        </div>
    }
}
import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

let data = {
	labels: [],
	datasets: [{}]
};

let labels = [];
let count = [];

class Chart extends Component {
    render(){
        this.props.data.map(data => {
            labels.push(data.ngram)
            count.push(data.count)
            return data
        });
        data.labels = labels;
        data.datasets = [{
            data: count,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }];
        return(
            <div id={this.props.view ? 'show' : 'hide'}>
                <Doughnut data={data} />
            </div>
        )
    }
}

export default Chart;
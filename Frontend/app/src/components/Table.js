import React, { Component } from 'react';

class Table extends Component {
    render(){
        return(
            <div id={!this.props.view ? 'show' : 'hide'}>
                <table>
                    <thead>
                        <tr className="table100-head">
                            <th>Ngram</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(data =>
                        <tr key={data.ngram}>
                            <td>{data.ngram}</td>
                            <td>{data.count}</td>
                        </tr>                           
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;
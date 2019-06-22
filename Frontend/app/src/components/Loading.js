import React, { Component } from 'react';
import '../style/Loading.css';

class Loading extends Component {

    render(){
        return (
            <div id="loading">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
                Loading...
            </div>
        )
    }
}

export default Loading;
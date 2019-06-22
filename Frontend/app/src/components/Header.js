import React, { Component } from 'react';
import SwitchButton from 'lyef-switch-button';
import Loading from './Loading';
import Table from './Table';
import Chart from './Chart';

class Header extends Component {
    state = {
        body: '',
        caseSensitive: true,
        nGram: 1,
        length: 100,
        textAdded: false,
        error: null,
        data: [],
        isLoaded: false,
        onSubmit: false,
        switchView: false
    }

    handleTextOnKeyDown = event => {
        if(['Enter', 'Tab', ','].includes(event.key)) {
          event.preventDefault();
          const text = this.state.body.trim();
    
          if(text) {
            this.setState({
              body: text,
              textAdded: true
            });
          }
        }
    }
    
    handleTextChange = event => {
        this.setState({
          body: event.target.value,
          error: null
        });
    }

    handleTextPaste = event => {
        event.preventDefault();
        const paste = event.clipboardData.getData('text');
        if(paste){
            this.setState({
                body: paste,
                error: null
            });
        }
    }

    handleTextDelete = () => {
        this.setState({
            body: '',
            textAdded: false
        });
    }

    handleNgramchange = event => {
        const nGram = event.target.value.trim();
        this.setState({
            nGram: nGram
        });
    }

    handleLengthchange = event => {
        const length = event.target.value.trim();
        this.setState({
            length: length
        })
    }

    handleCaseSensitive = event => {
        this.setState({ caseSensitive: event.target.checked })
    }

    handleResultRequest = event => {
        event.preventDefault();
        const body = this.state.body;
        const caseSensitive = this.state.caseSensitive;
        const nGram = this.state.nGram;
        const length = this.state.length;

        if(body){
            this.setState({
                onSubmit: true
            });
            const data = 
            {
                body: body,
                ngram: nGram,
                length: length,
                case_sensitive: caseSensitive
            }
            fetch('https://rjygvsf0x5.execute-api.us-east-2.amazonaws.com/prod/ngram',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    onSubmit: false,
                    isLoaded: true,
                    data: result
                });
            }
            ,
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    } 

    switchView = event => {
        const switchView = this.state.switchView;
        switchView
        ?
        this.setState({switchView : false})
        :
        this.setState({switchView : true})
    }

    render(){
        return(
            <main className="wrapper">
                {
                    this.state.textAdded
                    &&
                    <div className="text-chip">
                        {this.state.body}
                        <button
                        type="button"
                        className="button"
                        onClick={() => this.handleTextDelete()}
                        >
                        &times;
                        </button>
                    </div>
                }
                 <input 
                    className="input"
                    placeholder="Type or paste text and press Enter"
                    value={this.state.body}
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleTextOnKeyDown}
                    onPaste={this.handleTextPaste}
                  />
                  {
                    this.state.textAdded
                    &&
                    <div>
                        <input 
                            className="input"
                            placeholder="Type in Ngram"
                            pattern="[0-9]*"
                            value={this.state.nGram}
                            onChange={this.handleNgramchange}
                        />
                        <input 
                            className="input"
                            placeholder="Type in length"
                            pattern="[0-9]*"
                            value={this.state.length}
                            onChange={this.handleLengthchange}
                        />
                        <label>
                        <input
                            type="checkbox"
                            checked={this.state.caseSensitive}
                            onChange={this.handleCaseSensitive}
                        />
                        <span>Case sensitivity</span>
                        </label>
                        <button class="btn orange" type="button" onClick={this.handleResultRequest}>
                                <span>Get Results</span>
                        </button>
                    </div>
                  }
                  {
                        this.state.error 
                        &&
                        <p className="error">{this.state.error}</p>
                  }
                  {
                      this.state.isLoaded
                      &&
                      <div>
                        <SwitchButton
                            id="my-button"
                            labelLeft="Table view"
                            labelRight="Chart View"
                            isChecked ={this.state.switchView}
                            action={this.switchView}
                        />
                        <Chart view={this.state.switchView} data={this.state.data} />
                        <Table view={this.state.switchView} data={this.state.data} />
                      </div>
                  }
                  {
                      this.state.onSubmit
                      &&
                      <Loading />
                  }  
            </main>
        )
    }
}

export default Header;
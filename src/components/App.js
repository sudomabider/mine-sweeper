import React, { Component } from 'react'
import BoardContainer from './BoardContainer'
import '../App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Mine Sweeper</h2>
        </div>
        <BoardContainer />
      </div>
    );
  }
}

export default App;

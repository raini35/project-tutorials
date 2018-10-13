import React, { Component } from 'react';
import './App.css';
// <label class="container">
//   <input type="checkbox"></input>
//   <span class="checkmark"></span>
//     {name}
// </label>
class App extends Component {

  render() {
    const calNames = ["Sleep", "Run", "Morning Routine", "Evening Routine", "Programming", "Study", "Gym", "Travel", "Water"];

    const listOfNames = calNames.map(name =>
      <label class="containero">
        <input type="checkbox"></input>
        <span class="checkmark"></span>
          {name}
      </label>);

    return (
      <div class="wrapper">
        <div className="navbar"><h1 style={{"margin-left":"20px"}}>GCal Analyzer</h1></div>
        <div className="calbar">
          <div className="calchart"></div>
          <div className="calnames">
            <h2 style={{"margin-left":"20px", "font-weight": "800"}}>My Calendars</h2>
              {listOfNames}
          </div>
        </div>
        <div className="calanalysis"><h2 style={{"margin-left":"20px"}}>Calendar Analysis</h2></div>
      </div>
    );
  }
}

export default App;

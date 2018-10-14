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
        <div className="navbar">
          <h1 style={{"margin-left":"20px"}}>GCal Analyzer</h1>
        </div>

        <div className="calbar">
          <div className="calchart">
          </div>
          <div className="calnames">
            <h2 style={{"margin-left":"20px", "font-weight": "800"}}>My Calendars</h2>
              {listOfNames}
          </div>
        </div>

        <div className="calanalysis" style={{"text-align":"center"}}>
            <div className="squares">
              <div className="tile" style={{"background-color":"rgb(60,60,60)"}}>
                <h3>General Info 1</h3>
              </div>
              <div className="tile" style={{"background-color":"rgb(60,60,60)"}}>
                <h3>General Info 2</h3>
              </div>
              <div className="tile" style={{"background-color":"rgb(60,60,60)"}}>
                <h3>General Info 3</h3>
              </div>
            </div>
            <div className="rectangles">
              <div className="tile" style={{"background-color":"rgb(60,60,60)"}}>
                <h3>Chart 1</h3>
              </div>

              <div className="tile" style={{"background-color":"rgb(60,60,60)"}}>
                <h3>Chart 2</h3>
              </div>
            </div>
            <div style={{"background-color":"rgb(60,60,60)", "height":"500px"}}>
              <h3>Table</h3>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

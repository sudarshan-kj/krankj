import React from 'react';
import logo from './gear.svg';
import './App.css';

class App extends React.Component {

constructor(props){
  super(props);
  this.state = {bgColor: "#ff0055", colorTracker: -1};
}

toggleColors = () => {
  var colors = ["#47fa00","#282c34", "#00ddfa","#fac000","#ff0055"];
  this.setState(prevState =>  {
    var colorIndex = prevState.colorTracker + 1;
    colorIndex = colorIndex % (colors.length );
    return ( {colorTracker: colorIndex, bgColor: colors[this.state.colorTracker] }) }
  );
};

render() {
  return (
    <div className="App">
      <header className="App-header"  onClick={() => this.toggleColors()} style={{backgroundColor: this.state.bgColor}} >
        <img src={logo} className="App-logo"  alt="logo" />
        <p>
          <b><code>Site is currently under development. Please come back on July 15th, 2020</code></b>
        </p>
      </header>
    </div>
  );
}
}

export default App;

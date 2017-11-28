import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    axios.get('/test')
    .then((data) => console.log('fetched', data))
    .catch((error) => console.log('failed'));
  }


  render() {
    return (
      <div>
        Hello
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

export default App;
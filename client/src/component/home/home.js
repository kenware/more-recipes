import React, { Component } from 'react';

import nave from './nav';


class App extends Component {

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
          <nave.nav />
        </nav>
        <div></div>
        <footer class="py-5 bg-dark">
          <nave.footer />
        </footer>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import './index.scss';
import Header from '../App/common/header';

class Home extends Component {
  render() {
    return (
      <div>
       <Header.nav />
       <div >
          Welcome to details
       </div>
       <Header.footer />
      </div>
    );
  }
}
export default Home;
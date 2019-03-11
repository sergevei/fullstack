import React, { Component } from 'react';
import './App.css';

import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import LeftSideBar from './components/left_sidebar';
import MainContent from './components/main_content';
import Latest from './components/right_sidebar/latest';
import Popular from './components/right_sidebar/popular';
import 'bootstrap-4-grid';

class App extends Component {
  render() {
    return (
      <div className="row">
        <Header/>
        <div className="col-md-3">
            <p>Category</p>
            <LeftSideBar/>
        </div>
        <div className="col-md-6">
            <MainContent/>
        </div>
        <div className="col-md-3">
            <p>Latest</p>
            <Latest/>
            <p>Popular</p>
            <Popular/>
        </div>
          
        <div className="col-md-6">
            <Login/>
        </div>
        <div className="col-md-6">
            <Register/>
        </div>
      </div>
    );
  }
}

export default App;

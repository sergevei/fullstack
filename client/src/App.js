import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import LeftSideBar from './components/left_sidebar';
import MainContent from './components/main_content';
import Latest from './components/right_sidebar/latest';
import Popular from './components/right_sidebar/popular';
import 'bootstrap-4-grid';
import { Provider } from 'react-redux';
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="row">
              <Header/>
              <div className="col-md-3">
                  <Route exact path="/" component={LeftSideBar}/>
              </div>
              <div className="col-md-6">
                  <Route exact path="/" component={MainContent}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/registration" component={Register}/>
              </div>
              <div className="col-md-3">
                  <Route exact path="/" component={Latest}/>
                  <Route exact path="/" component={Popular}/>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

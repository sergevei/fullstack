import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Route ,Switch} from 'react-router-dom';
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
import JWTDecode from 'jwt-decode';
import SetAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Profile from './components/profile'; 

//Check token
if(localStorage.jwtToken){
  //SET token
  SetAuthToken(localStorage.jwtToken);
  //DELETE token
  const decode = JWTDecode(localStorage.jwtToken);
  //Check auth
  store.dispatch(setCurrentUser(decode));
}

const currentTime = Date.now()/1000;
if(localStorage.jwtToken){
  if( JWTDecode(localStorage.jwtToken).exp < currentTime ){
    store.dispatch(logOutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href('/login');
  }
}
  
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
                {/*<Switch>*/}
                  <Route exact path="/" component={MainContent}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/registration" component={Register}/>
                  {/*<Route exact component={ErrorPage}/>
                </Switch>*/}
              </div>
              <div className="col-md-3">
                  <Route exact path="/" component={Latest}/>
                  <Route exact path="/" component={Popular}/>
              </div>
              <div className="col-md-12">
                  <Route exact path="/profile" component={Profile}/>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

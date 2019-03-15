import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Switch} from 'react-router-dom';
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
import PrivateRoute from './components/private_router';
import CreateProfile from './components/create_profile';
import EditProfile from './components/edit_profile';
import AddNews from './components/add_new_news';
//import ErrorPage from './components/error_page_404';

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
                <Switch>
                    <PrivateRoute exact path="/" component={LeftSideBar}/>
                </Switch>
              </div>
              <div className="col-md-6">
                <Switch>
                  <PrivateRoute exact path="/" component={MainContent}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/registration" component={Register}/>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                  <PrivateRoute exact path="/add-new-news" component={AddNews}/>
                </Switch>
              </div>
              <div className="col-md-3">
                <Switch>
                  <PrivateRoute exact path="/" component={Latest}/>
                  <PrivateRoute exact path="/" component={Popular}/>
                </Switch>
              </div>
              <div className="col-md-12">
                <Switch>
                  <PrivateRoute exact path="/profile" component={Profile}/>
                </Switch>           
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

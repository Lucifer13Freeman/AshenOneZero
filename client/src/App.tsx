import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

//import logo from './logo.svg';
//import './App.css';

import store from './store/store';
import set_auth_token from './utilites/set_auth_token';

import { set_current_user, logout } from './actions/auth';

import PrivateRoute from './components/shared/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CloudEffect from './components/effects/CloudEffect';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AllPosts from './components/all-posts/AllPosts';
import SinglePost from './components/single-post/SinglePost';
import UserProfile from './components/user-profile/UserProfile';
import Feed from './components/feed/Feed';
import NotFound from './components/not-found/NotFound';


if (localStorage.access_token)
{
  const { access_token } = localStorage;
  set_auth_token(access_token);
  const decoded:any = jwtDecode(access_token);
  store.dispatch(set_current_user(decoded));
  const current_time = Date.now() / 1000;

  if (decoded.exp < current_time)
  {
    store.dispatch(logout());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <CloudEffect />
            <div className="container">
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <Route exact path="/" component={AllPosts}></Route>
              <Route path="/post/:id" component={SinglePost}></Route>
              <Route path="/user/:id" component={UserProfile}></Route>
              <Switch>
                <PrivateRoute path="/feed" component={Feed} />
              </Switch>
              <Route path="/404" component={NotFound}></Route>
            </div>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

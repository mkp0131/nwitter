import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "Routes/Home";
import Auth from "Routes/Auth";
import Profile from "Routes/Profile";
import Navigation from 'Components/Navigaion';

const Fn = ({isLoggedIn}) => {

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
        
        
      </Switch>
    </Router>
  )
}

export default Fn;
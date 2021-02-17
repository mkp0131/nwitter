import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "Routes/Home";
import Auth from "Routes/Auth";

const Fn = ({isLoggedIn}) => {

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/editProfile" component={Home} />
            <Route exact path="/" component={Home} /> */}
          </>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
        
        
      </Switch>
    </Router>
  )
}

export default Fn;
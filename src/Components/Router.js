import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "Routes/Home";
import Auth from "Routes/Auth";

const Fn = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

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
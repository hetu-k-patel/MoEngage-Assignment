import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Animes from './Animes';
import Login from './Login';
import Registration from './Registration';

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <Switch>
                  <Route exact path="/register" component={Registration} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/animes" component={Animes} />
                  <Redirect from="/" to="login" />
               </Switch>
            </div>
         </Router>
      );
   }
}
export default App;

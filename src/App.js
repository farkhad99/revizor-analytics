import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminLogin from './views/adminLogin';
import Admin from      './views/admin';
import Main from       './views/main';
import Survey from     './views/survey';

class App extends Component {
  render() {
  
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/adminka' component={Admin}/>
          <Route exact path='/login/admin' component={AdminLogin}/>
          <Route exact path='/surveyform/:id' component={Survey}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
 
  }
}

export default App;
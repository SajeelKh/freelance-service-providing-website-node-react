import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers/history';
import { alertActions } from '../actions';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login';
import '../styles/App.css'

class App extends Component {
  constructor(props){
    super(props);

    history.listen((location, action) => {
      this.props.clear();
    });
  }

  render() {
    const alert = this.props.alert;
    return (
        <div className="App">
          {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
          <NavLink to= {"/home"}>
            Home
          </NavLink>
          <NavLink to= {"/login"}>
            Login
          </NavLink>
          <Switch>
            <PrivateRoute path="/home" component={Home}></PrivateRoute>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return{
    alert,
  }
}

App = connect(mapStateToProps, { ...alertActions })(App);

export default App;

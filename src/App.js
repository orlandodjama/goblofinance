import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BaseRouter from './routes';
import './App.css';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();  
  });
  return (

  <Router>
    <BaseRouter />
  </Router>

  )
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);

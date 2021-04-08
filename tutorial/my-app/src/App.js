import logo from './logo.svg';
import './App.css';
import React , {useState,useEffect} from "react";
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import Items from "./components/post_all";
import Page from "./components/home";
import Single from "./components/test";
import Sub from "./components/compose";
//props and map fucntion


function App() {
return (
  <Router>
  <div className="App">
  <Switch>
    <Route path="/" exact component={Page}/>
    <Route path="/posts" exact component={Items}/>
    <Route path="/posts/:id" component={Single}/>
    <Route path="/compose" component={Sub}/>
  </Switch>
  </div>   
  </Router>

  );
}



export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import Projects from './components/Projects';
import * as serviceWorker from './serviceWorker';


function App() {
  const [token, setToken] = useState(null);
  const onLogin = t => setToken(t);
  const onLogout = () => setToken(null);

  //This will store the token in local storage so users will not have to log in if re-opening app.
  useEffect(
    () => {
      if (localStorage.getItem("token", token) != null) {
        setToken(localStorage.getItem("token", token));
      }
    },
    [] //the dependencies
  );


  return (
    <div className="App">
        <Login onLogin={onLogin} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

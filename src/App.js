import React from 'react';
import './resources/css/app.css';
import './resources/css/bootstrap.min.css';
import {Route, Switch } from "react-router-dom";
import Layout from './HOC/Layout'
import Home from './components/home'
import Gallery from './components/gallery';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/gallery" exact component={Gallery} />
      </Switch>
    </Layout>
  );
}

export default App;

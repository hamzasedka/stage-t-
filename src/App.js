import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home';
import Reports from './screens/Reports';
import { ModalToPrint, modalToPrint } from './components/modalClass';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={ModalToPrint} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

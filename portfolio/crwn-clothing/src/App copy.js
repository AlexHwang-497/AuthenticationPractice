import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component'
import{auth} from './firebase/firebase.utils'
import { render } from '@testing-library/react';

// ! discuss a little more detail of what is going on here
// todo: compnent -  will be the compnent that we wnat to render
// todo: path - will be a string equal to the path itself from the current place; ex. localhost:3000
// todo:exact - is a true or false property
// *these are the main thing we need for our route component
// todo: switch component - we need to wrap our wrote components in it
// todo: what this does is the moment that route inside of it finds a match in its path, it does not render anything else but that route
// todo: switch will match slash first and then it will not render anthing else after it
// * firebase: for firebase, we want to store the state of our user aka how are they loggin in? ex. through goog?, email and password?
  // * to do this we will now convert the App() into a class
  // *w/ firebase, we just want to know when are we signed in and when we are signed out
  class App extends React.Component {
    constructor() {
      super();
  
      this.state = {
        currentUser: null
      };
    }
  
    unsubscribeFromAuth = null;
  
    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        this.setState({ currentUser: user });
  
        console.log(user);
      });
    }
  
    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }
  
    render() {
      return (
        <div>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </div>
      );
    }
  }

export default App;

// *we took out this because we wanted to show an example for linking and routing
// const HatsPage=()=>(
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>

// )
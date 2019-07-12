import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser } from './redux/user/user.actions';



class App extends Component {
  
unsubscribeFromAuth = null;


  componentDidMount() {
    const styles = [
      'background: linear-gradient(#D33106, #571402)'
      , 'border: 1px solid #3E0E02'
      , 'color: white'
      , 'display: block'
      , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
      , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
      , 'line-height: 40px'
      , 'text-align: center'
      , 'font-weight: bold'
    ].join(';')
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          console.log('%c SNAPSHOT FIRED!', styles)
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
              });
        });
        
      }
      else {
        console.log('%c ELSE FIRED!', styles)
       setCurrentUser(userAuth)
      
      }
     });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
                  render={ () => 
                  this.props.currentUser 
                  ? (<Redirect to='/' />)
                  : (<SignInAndSignUpPage />)
                  } 
                  />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
    })

export default connect(mapStateToProps, mapDispatchToProps)(App);

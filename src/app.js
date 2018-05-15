import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { CardSection, Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCeTu8kQmTGHtrQc-ym3WPiPx-EJWnLLuQ',
      authDomain: 'authentication-daf16.firebaseapp.com',
      databaseURL: 'https://authentication-daf16.firebaseio.com',
      projectId: 'authentication-daf16',
      storageBucket: 'authentication-daf16.appspot.com',
      messagingSenderId: '836613926177'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <CardSection><Button onPress={() => firebase.auth().signOut()}>
        Log Out
        </Button></CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render () {
    return (
      <View>
      <Header headerText="Authentication"></Header>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

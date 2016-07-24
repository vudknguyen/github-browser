import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import AuthService from '../services/AuthService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
    };
  }

  onLoginPressed() {
    console.log(`Attempting to login with username/password:${this.state.username}/${this.state.password}`);
    this.setState({
      showProgress: true,
    });

    AuthService.login({
      username:this.state.username,
      password: this.state.password
    })
      .then((result) => {
        this.setState({success: true});
      })
      .catch(err =>  {
        this.setState(err); 
      })
      .finally(() => {
        this.setState({
          showProgress: false,
        });

        if(this.state.success && this.props.onLogin) {
          this.props.onLogin();
        }
      });
  }

  render() {

    let errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
        </Text>;
    }

    if(!this.state.success && this.state.unknowError) {
      errorCtrl = <Text style={styles.error}>
        We experieced un expected issue
        </Text>;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat') } />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput
          style={styles.input}
          placeholder="Github username"
          onChangeText={(text) => this.setState({ username: text }) } />
        <TextInput
          style={styles.input}
          placeholder="Github password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text }) } />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed.bind(this) }>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 66,
    height: 55,
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#48BBEC',
    color: '#48BBEC',
    borderRadius: 4,
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  loader: {
    marginTop: 10
  },
  error: {
    color:'red',
    paddingTop : 10,
  }
});
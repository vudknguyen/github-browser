import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import AuthService from '../services/AuthService';
import SearchResults from './SearchResults';
import moment from 'moment';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onSearchPress() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Result',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }

  render() {
    return <View style={styles.container}>
      <TextInput
        onChangeText={text => this.setState({ searchQuery: text }) }
        style={styles.input}
        placeHolder="Search Query">
      </TextInput>
      <TouchableHighlight
        style={styles.button}
        onPress={this.onSearchPress.bind(this) }>
        <Text style={styles.buttonText}>
          Search
        </Text>
      </TouchableHighlight>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10,
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
});

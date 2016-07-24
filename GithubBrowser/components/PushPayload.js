import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import AuthService from '../services/AuthService';
import moment from 'moment';

export default class PushPayload extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C']),
    };
  }

  render() {
    return (<View style={{
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <Text>hello</Text>
    </View>);
  }
}

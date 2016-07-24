import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';

import AuthService from '../services/AuthService';
import moment from 'moment';
import PushPayload from './PushPayload';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C']),
      showProgress: true,
    };
  }

  componentDidMount() {
    this.fetchFeed()
      .then(feedItems => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false,
        })
      })
      .catch(err => console.log(err));
  }

  fetchFeed() {
    return AuthService.getAuthInfo()
      .then((authInfo) => {
        var url = `https://api.github.com/users/${authInfo.user.login}/received_events`;

        return fetch(url, {
          headers: authInfo.header
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        return responseData.filter((ev) => {
          return ev.type === 'PushEvent';
        });
      });
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData) }
        underlayColor='#DDD'>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#DDD'
        }}>
          <Image
            source={{ uri: rowData.actor.avatar_url }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }} />
          <View style={{
            paddingLeft: 10,
          }}>
            <Text style={{ color: '#666' }}>
              {moment(rowData.created_at).fromNow() }
            </Text>
            <Text style={{ color: '#666', fontWeight: '600' }}>
              {rowData.actor.login}
            </Text>
            <Text style={{ color: '#666' }}>
              {rowData.payload.ref.replace('refs/heads/', '') }
            </Text>
            <Text style={{ color: '#666' }}>
              at  <Text style={{ fontWeight: '600' }}>
                {rowData.repo.name }
              </Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>);
  }

  render() {

    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <ActivityIndicator
            animating={true}
            size='large'
            />
        </View>
      );
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop:50,
        paddingBottom:50
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this) } />
      </View>
    );
  }
}

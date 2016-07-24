import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

export default class AuthService {
  static getAuthInfo() {
    return AsyncStorage.multiGet([authKey, userKey])
      .then((val) => {
        let pairedObj =  _.fromPairs(val);
        if(!pairedObj[authKey]) {
          return null;
        }

        let authInfo = {
          header: {
            Authorization: `Basic ${pairedObj[authKey]}`,
          },
          user: JSON.parse(pairedObj[userKey]),
        }

        return authInfo;
      });
  }

  static login(creds) {
    const b = new buffer.Buffer(`${creds.username}:${creds.password}`);
    const encodedAuth = b.toString('base64');
    return fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Basic ${encodedAuth}`
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status === 401,
          unknowError: response.status !== 401,
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(result)]
        ]).then(() => {
          return result;
        });
      })
      .catch(err => {
        throw err;
      });
  }
}
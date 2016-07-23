import buffer from 'buffer';

export default class AuthService {
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
        return result;
      })
      .catch(err => {
        throw err;
      });
  }
}
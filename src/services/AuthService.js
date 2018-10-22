import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
  authenticateUser(email, password) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    console.log('formData', formData);

    return axios.post(`https://dev-go.insuresign.com/api/login`, formData)
      .then(response => {
        console.log('response', response.data);
        return response.data;
      }).then((userData)=> {
        console.log('userData', userData);
        var token = userData.Token;
        var user = JSON.stringify(userData.user);
        if (token) {
          this.setToken(token);
          this.setUser(user);
        }
        return userData;
      })
      .catch(e => {
        console.log('error', e);
      });
  }

  userAuthenticated() {
    let token = this.getToken();
    if (this.tokenSeemsValid(token)) {
      return true;
    }
    return false;
  }

  deauthenticateUser(token, user) {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setTimeout(token, 100);
    window.location = '/';
  }

  tokenSeemsValid(token) {
    if (token) {
      try {
        const decoded = decode(token);
        if (decoded && decoded.exp && decoded.exp > Date.now() / 1000) {
          return true;
        }
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  setToken(token) {
    localStorage.setItem('userToken', token);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  setUser(user) {
    localStorage.setItem('user', user);
  }

  getUser() {
    let token = this.getToken();
    if (token) {
      decode(this.getToken());
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return false;
    }
  }
}

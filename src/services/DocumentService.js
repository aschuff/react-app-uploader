import axios from 'axios';
import AuthService from './AuthService';

export default class DocumentService {

    getDocuments() {
        const Auth = new AuthService();
        return axios(`https://dev-go.insuresign.com/api/documents/summary`, {
            method: 'GET',
            headers: {Authorization: 'Bearer ' + Auth.getToken()}
        })
        .then((response) => {
            console.log('response.data: ', response.data);
            return response.data;
        })
        .catch(e => {
            console.log('error', e);
        });
    }

    getUploadedDocuments() {
        const Auth = new AuthService();
        return axios(`https://dev-go.insuresign.com/api/users/uploads`, {
          method: 'GET',
          headers: {Authorization: 'Bearer ' + Auth.getToken()}
        })
        .then((response)=> {
            console.log('response', response);
            return response.data;
        })
        .catch((err)=> {
            console.log('err', err);
        })
    }
}

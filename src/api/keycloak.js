import axios from 'axios';

export default class KeycloakAPI {
    static getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/keycloak/users`)
                .then(res => {
                    console.log(">>", res)
                    resolve(res.data)
                })
                .catch(err => reject(err))
        });
    }
} 
import axios from 'axios';

export default class UserAPI {
    static getAll(data) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/user_system/all`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/user_system/register`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/user_system/id/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/backoffice/user_system/${id}`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/backoffice/user_system/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
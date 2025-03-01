import axios from 'axios';

export default class RoleAPI {
    static getAll(data) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/role`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/role`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/role/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/backoffice/role/${id}`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/backoffice/role/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
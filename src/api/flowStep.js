import axios from 'axios';

export default class FlowStepAPI {
    static getAll(data) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/flowstep/steps`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/flowstep/steps`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/flowstep/steps/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/backoffice/flowstep/steps/${id}`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/backoffice/flowstep/steps/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
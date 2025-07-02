import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.quiz.xn--am-yja.org/api/quizzes',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', "x-api-key": 'FGSAPIKEY' }
});

export default class QuizzAPI {
    static getAll() {
        return new Promise((resolve, reject) => {
            api.get(`/`)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => reject(err))
        });
    }

    static create(data) {
        return new Promise((resolve, reject) => {
            api.post(`/`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            api.get(`/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            api.put(`/${id}`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            api.delete(`/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
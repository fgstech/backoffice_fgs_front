import axios from 'axios';

export default class SchoolAPI {
    static getAllBootcamps() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/school/bootcamps`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getBootcampsById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/school/bootcamps/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static createAttendance(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/school/bootcamps/attendance`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getAttendance() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/school/bootcamps/attendance`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getAttendaceById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/school/bootcamps/attendance/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
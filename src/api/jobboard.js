import axios from 'axios';

class JobboardEmployers {
    getAll() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/employers`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/employers/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}

class JobboardProfiles {
    getAll() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/profiles`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/profiles/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}

class JobboardApplications {
    getAll() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/applications`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/applications/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}

class JobboardJobs {
    getAll() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/jobs`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/jobboard/jobs/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}


export default class JobboardAPI {
    static employers = new JobboardEmployers();
    static applications = new JobboardApplications();
    static profiles = new JobboardProfiles();
    static jobs = new JobboardJobs();
}
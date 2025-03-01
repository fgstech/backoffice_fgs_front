import axios from 'axios';

export default class EmploymentReportAPI {
    static generateEmploymentSummary() {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/employment/report/summary`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static generateEmploymentSummaryDate(startDate, endDate) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/employment/report/summary`, { startDate, endDate })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static byyears(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/backoffice/employment/report/byyears`, { data })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static jobboardReport(data) {
        return new Promise((resolve, reject) => {
            axios.get(`/backoffice/employment/report/jobboard`, { data })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
}
import JobboardAPI from "../../api/jobboard";
import Applications from "../Applications";

class JobsController {
    columns = [
        { key: 'name', label: 'Nombre' },
        { key: 'employerName', label: "Empleador" },
        { key: 'applications', label: "Aplicaciones", style: { textAlign: "center" } },
        { key: 'clicks', label: "Clicks", style: { textAlign: "center" } },
        { key: 'views', label: "Visualizaciones", style: { textAlign: "center" } },
        { key: 'expired', label: "Vigencia", style: { textAlign: "center" } },
    ];

    async getAll() {
        return new Promise((resolve, reject) => {
            JobboardAPI.jobs.getAll()
                .then(res => {
                    const data = res.data.data;
                    const jobs = data.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ jobs }));
                    resolve(jobs);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const vjob = Applications.state.jobs.find(e => e._id === id);
            if (vjob) Applications.updateState(state => ({ vjob }));

            JobboardAPI.jobs.getAll()
                .then(res => {
                    console.log(res);
                    const vjob = res;
                    Applications.updateState(state => ({ vjob }));
                    resolve(vjob)
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }
}


export default new JobsController();
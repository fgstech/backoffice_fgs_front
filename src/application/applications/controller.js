import JobboardAPI from "../../api/jobboard";
import Applications from "../Applications";

class ApplicationsJobsController {
    columns = [
        { key: 'job', label: 'Nombre' },
        { key: 'profileName', label: "Nombre postulante" },
        { key: 'profileEmail', label: "Email postulante" },
        { key: 'profilePhone', label: "Teléfono postulante" },
    ];

    async getAll() {
        return new Promise((resolve, reject) => {
            JobboardAPI.applications.getAll()
                .then(res => {
                    const data = res.data.data;
                    console.log(data);
                    const applications = data.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ applications }));
                    resolve(applications);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const vapplication = Applications.state.applications.find(e => e._id === id);
            if (vapplication) Applications.updateState(state => ({ vapplication }));

            JobboardAPI.applications.getAll()
                .then(res => {
                    console.log(res);
                    const vapplication = res;
                    Applications.updateState(state => ({ vapplication }));
                    resolve(vapplication)
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }
}


export default new ApplicationsJobsController();
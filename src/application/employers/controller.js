import JobboardAPI from "../../api/jobboard";
import Applications from "../Applications";

class EmployerController {
    columns = [
        { key: 'name', label: 'Nombre' },
        { key: 'applications', label: "Postulaciones", style: { textAlign: "center" } },
        { key: 'applies', label: "Aplicaciones", style: { textAlign: "center" } },
        { key: 'jobs', label: "Trabajos", style: { textAlign: "center" } },
        { key: 'views', label: "Visualizaciones", style: { textAlign: "center" } },
        { key: 'active', label: "Activo", style: { textAlign: "center" } }
    ];

    async getAll() {
        return new Promise((resolve, reject) => {
            JobboardAPI.employers.getAll()
                .then(res => {
                    const data = res.data.data;
                    const employers = data.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ employers }));
                    resolve(employers);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const vemployer = Applications.state.employers.find(e => e._id === id);
            if (vemployer) Applications.updateState(state => ({ vemployer }));

            JobboardAPI.employers.getAll()
                .then(res => {
                    console.log(res);
                    const vemployer = res;
                    Applications.updateState(state => ({ vemployer }));
                    resolve(vemployer)
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }
}


export default new EmployerController();
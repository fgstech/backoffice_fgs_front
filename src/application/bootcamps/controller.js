import SchoolAPI from "../../api/school";
import Applications from "../Applications";

class BootcampController {
    columns = [
        { key: 'title', label: 'Nombre' },
        { key: 'max_number_of_users', label: "número máximo de usuarios" },
        { key: 'tags', label: "Tags" },
        { key: 'actions', label: 'Acciones' }
    ];

    studentsColumns = [
        { key: 'username', label: 'Nombre' },
        { key: 'email', label: 'Correo eléctronico' },
        { key: "asistenca", label: "% Asistencia", style: { textAlign: "center" } },
    ]


    async getBootcamps() {
        return new Promise((resolve, reject) => {
            SchoolAPI.getAllBootcamps()
                .then(res => {
                    const bootcamps = res.data;
                    Applications.updateState(state => ({ bootcamps }));
                    resolve(bootcamps);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })
    }

    async getBootcampsById(id) {
        return new Promise((resolve, reject) => {
            const vbootcamp = Applications.state.bootcamps.find(e => e._id === id);
            if (vbootcamp) Applications.updateState(state => ({ vbootcamp }));

            SchoolAPI.getBootcampsById(id)
                .then(res => {
                    const vbootcamp = res.data;
                    Applications.updateState(state => ({ vbootcamp }));
                    resolve(vbootcamp)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async createAttendance(data) {
        return new Promise((resolve, reject) => {
            SchoolAPI.createAttendance(data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

export default new BootcampController();
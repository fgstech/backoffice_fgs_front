import JobboardAPI from "../../api/jobboard";
import Applications from "../Applications";

class ProfilesController {
    columns = [
        { key: 'cover', label: "Rol de usuario" },
        { key: 'name', label: 'Nombre del perfil' },
        { key: 'email', label: "Correo eléctronico" },
        { key: 'applications', label: "Cantidad de aplicaciones", style: { textAlign: "center" } },
        { key: 'confirmed', label: "Validado", style: { textAlign: "center" } },
        { key: 'active', label: "Estado", style: { textAlign: "center" } },
    ];

    async getAll() {
        return new Promise((resolve, reject) => {
            JobboardAPI.profiles.getAll()
                .then(res => {
                    const data = res.data.data;
                    console.log(data);
                    const profiles = data.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ profiles }));
                    resolve(profiles);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const vprofile = Applications.state.profiles.find(e => e._id === id);
            if (vprofile) Applications.updateState(state => ({ vprofile }));

            JobboardAPI.profiles.getAll()
                .then(res => {
                    console.log(res);
                    const vprofile = res;
                    Applications.updateState(state => ({ vprofile }));
                    resolve(vprofile)
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }
}


export default new ProfilesController();
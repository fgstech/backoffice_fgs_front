import Applications from "../Applications";
import RoleAPI from "../../api/role";

class RoleController {
    columns = [
        { key: '_id', label: 'ID' },
        { key: 'name', label: "Nombre" },
        { key: 'actions', label: 'Acciones' }
    ];

    modulesRole = [
        "usuarios", 
        "roles", 
        "academia-bootcamps", 
        "academia-quiz",
        "talentos-trabajos",
        "talentos-perfiles",
        "talentos-aplicaciones",
        "talentos-empleabilidad", 
        "talentos-empleadores",
        "ecosistema-usuarios",
    ];

    getRoles() {
        return new Promise((resolve, reject) => {
            RoleAPI.getAll()
                .then(res => {
                    const roles = res.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ roles }));
                    resolve(roles);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    createRol(data) {
        return new Promise((resolve, reject) => {
            RoleAPI.create(data)
                .then(res => {
                    this.getRoles();
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const vrole = Applications.state.roles.find(e => e._id === id);
            if (vrole) Applications.updateState(state => ({ vrole }));

            RoleAPI.getById(id)
                .then(res => {
                    const vrole = res;
                    Applications.updateState(state => ({ vrole }));
                    resolve(vrole)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            RoleAPI.update(id, data)
                .then(res => {
                    this.getRoles();
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            RoleAPI.remove(id)
                .then(res => {
                    this.getRoles();
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

export default new RoleController();
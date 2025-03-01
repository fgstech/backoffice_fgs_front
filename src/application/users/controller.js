import UserAPI from "../../api/user";
import Applications from "../Applications";
import RoleController from '../roles/controller';

class UserController {
    columns = [
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: "Correo eléctronico" },
        { key: 'role', label: "Rol de usuario" },
        { key: 'actions', label: 'Acciones' }
    ];


    async getAll() {
        return new Promise((resolve, reject) => {
            UserAPI.getAll()
                .then(res => {
                    const users = res.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ users }));
                    resolve(users);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })
    }

    async loadData() {
        await this.getAll();
        await RoleController.getRoles();
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const vuser = Applications.state.users.find(e => e._id === id);
            if (vuser) Applications.updateState(state => ({ vuser }));

            UserAPI.getById(id)
                .then(res => {
                    const vuser = res;
                    Applications.updateState(state => ({ vuser }));
                    resolve(vuser)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async create(data){
        return new Promise((resolve,reject) => {
            UserAPI.create(data)
            .then(res => {
                this.getAll();
                resolve(res)
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }

    async update(id, data){
        return new Promise((resolve,reject) => {
            UserAPI.update(id, data)
            .then(res => {
                this.getAll();
                resolve(res)
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }

    async remove(id){
        return new Promise((resolve,reject) => {
            UserAPI.remove(id)
            .then(res => {
                this.getAll();
                resolve(res)
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }
}

export default new UserController();
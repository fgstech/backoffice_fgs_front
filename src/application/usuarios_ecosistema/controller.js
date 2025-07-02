import KeycloakAPI from "../../api/keycloak";
import Applications from "../Applications";

class EcosystemUserController {
    columns = [        
        { key: 'username', label: "Nombre de usuario" },
        { key: 'first_name', label: "Nombre" },
        { key: 'last_name', label: "Apellido" },
        { key: 'email', label: "Correo eléctronico" },
        { key: 'email_verified', label: "Email verificado" },
        { key: 'enabled', label: "Estado" },
        { key: 'balance', label: "Puntos Ñamis" },
    ];

    async getAll() {
        return new Promise((resolve, reject) => {
            KeycloakAPI.getUsers()
                .then(res => {
                    const data = res.data;
                    const ecosystem_users = data.map(e => Applications.parseDataBySelect(e, e.name));
                    Applications.updateState(state => ({ ecosystem_users }));
                    resolve(ecosystem_users);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }
}


export default new EcosystemUserController();
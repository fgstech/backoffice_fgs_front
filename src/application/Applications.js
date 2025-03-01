import { getUserId } from "../lib/Router";
import Ngex from "../insfrastructure/helpers/ngex/ngex";
import reducer from "../state/reducer";
import UserAPI from "../api/user";
import AxiosService from '../lib/axios';

class Application extends Ngex {
    kId = "itfgscomm";
    idwlKey = "lwfgscomm"
    constructor(state) {
        super(state);
        this.loadMain = this.loadMain.bind(this);
    }

    static getInstance(reduce) {
        return new Application(reduce);
    }

    profile = getUserId();
    state = this.getState();

    notify(payload = {}) {
        let noty = {}
        noty['id'] = payload['id'] != undefined ? parseInt(payload['id']) : Math.random().toString(36).slice(-8);
        noty['control'] = payload['id'] != undefined ? "custom" : "default";
        noty['type'] = payload['type'] != undefined ? payload['type'] : 'info';
        noty['title'] = payload['title'] != undefined ? payload['title'] : 'Información';
        noty['text'] = payload['text'] != undefined ? payload['text'] : '';
        noty['time'] = payload['time'] != undefined ? parseInt(payload['time']) : 2000;

        this.updateState(state => ({
            notifications: [...state.notifications, noty],
        }));
    }

    removeNotification(payload) {
        this.updateState(state => ({
            notifications: state.notifications.filter(n => n.id !== payload.id)
        }));
    }

    parseDataBySelect(object, label) {
        return {
            ...object,
            label: label,
            value: object._id
        }
    }

    async loadMain() {
        const permissionsRole = await AxiosService.getPermissionRole();
        const role = permissionsRole.name;
        const permissions = permissionsRole.permissions;
        this.updateState(state => ({ role }));
        this.updateState(state => ({ permissions }));
    }

    getLS(key) {
        return localStorage.getItem(key);
    }

    setLS(key, value) {
        return localStorage.setItem(key, value)
    }
}


export default Application.getInstance(reducer);
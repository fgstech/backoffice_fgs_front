import FlowStepAPI from "../../api/flowStep";
import Applications from "../Applications";

class FlowStepController {
    columns = [
        { key: 'title', label: 'Nombre' },
        { key: 'max_number_of_users', label: "número máximo de usuarios" },
        { key: 'tags', label: "Tags" },
        { key: 'actions', label: 'Acciones' }
    ];

    async getStepFlows() {
        return new Promise((resolve, reject) => {
            FlowStepAPI.getAll()
                .then(res => {
                    const flowsteps = res.data;
                    Applications.updateState(state => ({ flowsteps }));
                    resolve(flowsteps);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })
    }

    async getStepFlowById(id) {
        return new Promise((resolve, reject) => {
            const vflowstep = Applications.state.flowsteps.find(e => e._id === id);
            if (vflowstep) Applications.updateState(state => ({ vflowstep }));

            FlowStepAPI.getById(id)
                .then(res => {
                    const vflowstep = res.data;
                    Applications.updateState(state => ({ vflowstep }));
                    resolve(vflowstep)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async createStepFlow(data) {
        return new Promise((resolve, reject) => {
            FlowStepAPI.create(data)
                .then(res => {
                    this.getStepFlows();
                    resolve(res)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async updateStepFlow(id, data) {
        return new Promise((resolve, reject) => {
            FlowStepAPI.update(id, data)
                .then(res => {
                    this.getStepFlows();
                    resolve(res)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async removeStepFlow(id) {
        return new Promise((resolve, reject) => {
            FlowStepAPI.remove(id)
                .then(res => {
                    this.getStepFlows();
                    resolve(res)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

export default new FlowStepController();
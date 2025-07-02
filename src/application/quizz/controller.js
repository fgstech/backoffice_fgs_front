import QuizzAPI from "../../api/quizz";
import Applications from "../Applications";

class QuizzController {
    columns = [
        { key: 'title', label: 'Nombre', style: { width: "100%" } },
        { key: 'actions', label: 'Acciones' }
    ];

    async getQuizzes() {
        return new Promise((resolve, reject) => {
            QuizzAPI.getAll()
                .then(res => {
                    const quizzes = res;
                    Applications.updateState(state => ({ quizzes }));
                    resolve(quizzes);
                })
                .catch(err => reject(err))
        })
    }

    async getQuizzById(id) {
        return new Promise((resolve, reject) => {
            const vquizz = Applications.state.quizzes.find(e => e._id === id);
            if (vquizz) Applications.updateState(state => ({ vquizz }));

            QuizzAPI.getById(id)
                .then(vquizz => {
                    Applications.updateState(state => ({ vquizz }));
                    resolve(vquizz)
                })
                .catch(err => reject(err))
        })
    }

    async createQuizz(data) {
        return new Promise((resolve, reject) => {
            QuizzAPI.create(data)
                .then(res => {
                    this.getQuizzes();
                    resolve(res)
                })
                .catch(err => reject(err))
        })
    }

    async updateQuizz(id, data) {
        return new Promise((resolve, reject) => {
            QuizzAPI.update(id, data)
                .then(res => {
                    this.getQuizzes();
                    resolve(res)
                })
                .catch(err => reject(err))
        })
    }

    async removeQuizz(id) {
        return new Promise((resolve, reject) => {
            QuizzAPI.remove(id)
                .then(res => {
                    this.getQuizzes();
                    resolve(res);
                })
                .catch(err => reject(err))
        })
    }
}

export default new QuizzController();
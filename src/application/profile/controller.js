import UserAPI from "../../api/user";

class ProfileController {
    async getById(id) {
        return new Promise((resolve, reject) => {
            UserAPI.getById(id)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    async update(id, data) {
        return new Promise((resolve, reject) => {
            UserAPI.update(id, data)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    async changePassword(id, currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            UserAPI.update(id, { currentPassword, newPassword })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}

export default new ProfileController();
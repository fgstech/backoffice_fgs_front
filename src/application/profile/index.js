import React, { useState, useEffect } from 'react'
import Applications from '../Applications';
import ProfileController from './controller';
import AxiosService from '../../lib/axios'

const ProfileApplication = (props) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [modalConfirm, setModelConfirm] = useState(false);
    const [action, setAction] = useState(null);
    const [id, setId] = useState(null);

    useEffect(async () => {
        const user = await AxiosService.getPayload();
        const profile = await ProfileController.getById(user.id);
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
            setId(profile._id);
        }
    }, []);

    const update = () => {
        const data = { email, name }
        ProfileController.update(id, data)
            .then(res => Applications.notify({ title: "Exito!", type: "success", text: "success" }))
            .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
            .finally(() => setModelConfirm(false))
    }

    const updatePassword = () => {
        if (password === newPassword) {
            ProfileController.changePassword(id, oldPassword, password)
                .then(res => Applications.notify({ title: "Exito!", type: "success", text: "success" }))
                .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
                .finally(() => setModelConfirm(false))
        }
    }

    const callUpdate = () => {
        setAction("update");
        setModelConfirm(true);
    }

    const callUpdatePassword = () => {
        setAction("updatePassword");
        setModelConfirm(true);
    }

    const callAction = () => {
        switch (action) {
            case "update": return update();
            case "updatePassword": return updatePassword();
        }
    }

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        newPassword,
        setNewPassword,
        oldPassword,
        setOldPassword,
        updatePassword,
        callAction,
        callUpdatePassword,
        callUpdate,
        modalConfirm,
        setModelConfirm
    }
}


export default ProfileApplication;
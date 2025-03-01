import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import UsersController from './controller';

const UsersApplication = (props) => {
    const [users, setUsers] = useState(Applications.state.users)
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [rol, setRol] = useState(null);
    const [view, setView] = useState(null);
    const [confirmCreate, setConfirmCreate,] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [idRemoveModal, setIdRemoveModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const roles = Applications.state.roles;

    const columns = UsersController.columns;
    const customElements = {
        actions: (user) => (
            <div>
                <IconButton onClick={() => goView(user._id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
                <IconButton onClick={() => openRemoveModal(user._id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.33 16.5H13.66" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.5 12.5H14.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
            </div>
        ),
    };

    useEffect(async () => {
        Applications.on("users", data => setUsers(data))
        Applications.on("vuser", (data) => setView(data));
        UsersController.loadData();
        if (props.match?.params?.id) {
            await UsersController.getById(props.match?.params?.id);
            setEdit(true);
        }
    }, []);

    useEffect(() => {
        setName(view?.name);
        setEmail(view?.email);
        const rolParse = { label: view?.role, value: view?.role }
        setRol(rolParse);
    }, [view])


    const editData = (key, value) => {
        setView(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const goView = (id) => NavigationService.navigateTo(`/config/users/${id}`);
    const goNew = () => NavigationService.navigateTo(`/config/users/new`);
    const goBack = () => NavigationService.navigateBack();

    const openRemoveModal = (id) => {
        setIdRemoveModal(id);
        setRemoveModal(true);
    }

    const save = () => {
        const data = { email, role: rol.name, name, password: "admin01" }
        let promise = null;

        if (edit) {
            promise = UsersController.update(view._id, data);
        } else {
            promise = UsersController.create(data);
        }

        promise
            ?.then(res => {
                Applications.notify({ title: "Exito!", type: "success", text: "success" })
                setConfirmCreate(false);
            })
            ?.catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    }

    const remove = () => {
        UsersController.remove(idRemoveModal)
            .then(res => {
                Applications.notify({ title: "Exito!", type: "success", text: "success" })
                setConfirmCreate(false);
            })
            .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    }

    return {
        users,
        columns,
        customElements,
        goBack,
        confirmCreate,
        setConfirmCreate,
        removeModal,
        setRemoveModal,
        roles,
        name,
        setName,
        goNew,
        save,
        remove,
        email,
        setEmail,
        rol,
        setRol,
    }
}


export default UsersApplication;
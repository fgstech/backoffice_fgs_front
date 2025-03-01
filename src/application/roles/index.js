import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import RoleController from './controller';

const RoleApplication = (props) => {
    const [roles, setRoles] = useState(Applications.state.roles)
    const [view, setView] = useState(null)
    const [rolPermissions, setRolePermissions] = useState([]);
    const [rolName, setRolName] = useState(null);
    const [edit, setEdit] = useState(false);
    const [confirmCreate, setConfirmCreate] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const modulesRole = RoleController.modulesRole;
    const columns = RoleController.columns;
    const customElements = {
        actions: (element) => (
            <div>
                <IconButton onClick={() => goView(element._id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
                <IconButton onClick={() => openRemoveModal(element._id)}>
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
        Applications.on("roles", data => setRoles(data))
        Applications.on("vrole", (data) => {
            console.log("vrole", data);
            setView(data)
        });
        RoleController.getRoles();
        if (props.match?.params?.id) {
            await RoleController.getById(props.match?.params?.id);
            setEdit(true);
        }
    }, []);

    useEffect(() => {
        setRolName(view?.name);
        setRolePermissions(view?.permissions);
    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/config/roles/${id}`);
    const goBack = () => NavigationService.navigateBack()

    const handlePermissionsChange = (updatedPermissions) => setRolePermissions(updatedPermissions);

    // Simular guardado en una API
    const save = async () => {
        const data = {
            name: rolName,
            permissions: rolPermissions
        }

        let promise;

        if (edit) {
            promise = RoleController.update(view._id, data);
        } else {
            promise = RoleController.createRol(data);
        }

        promise
            ?.then(res => {
                Applications.notify({ title: "Exito!", type: "success", text: "success" })
                setConfirmCreate(false);
            })
            ?.catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    };


    const openRemoveModal = (id) => {
        setIdRemove(id);
        setOpenRemove(true);
    }

    const remove = () => {
        RoleController.remove(idRemove)
            .then(res => {
                Applications.notify({ title: "Exito!", type: "success", text: "success" })
                setOpenRemove(false);
            })
            .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    }

    return {
        roles,
        columns,
        customElements,
        goBack,
        goView,
        modulesRole,
        rolPermissions,
        handlePermissionsChange,
        save,
        rolName,
        setRolName,
        confirmCreate,
        setConfirmCreate,
        edit,
        view,
        openRemove,
        setOpenRemove,
        remove
    }
}


export default RoleApplication;
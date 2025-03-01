import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const ProfilesJobsApplication = (props) => {
    const [data, setData] = useState(Applications.state.profiles)
    const [view, setView] = useState(null);
    const columns = Controller.columns;
    const customElements = {
        cover: data => <img src={data.cover} style={{ width: 20, height: 20, borderRadius: 100 }} />,
        applications: data => <div className="text-center text-bold">{Array.isArray(data.applications) ? data.applications.length : 0}</div>,
        confirmed: data => <div className="text-center text-bold">{data.confirmed ? "Confirmado" : "Pendiente"}</div>,
        active: data => <div className="text-center text-bold">{data.confirmed ? "Activo" : "Inactivo"}</div>,
    };

    useEffect(async () => {
        Applications.on("profiles", data => setData(data))
        Applications.on("vprofile", (data) => setView(data));
        Controller.getAll();
        if (props.match?.params?.id) {
            await Controller.getById(props.match?.params?.id);
        }
    }, []);

    useEffect(() => {

    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/profiles/${id}`);
    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        goBack,
    }
}


export default ProfilesJobsApplication;
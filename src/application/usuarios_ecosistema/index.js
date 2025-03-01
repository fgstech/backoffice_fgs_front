import React, { useState, useEffect } from 'react'
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const EcosystemUsersApplication = (props) => {
    const [data, setData] = useState(Applications.state.ecosystem_users)
    const [view, setView] = useState(null);
    const columns = Controller.columns;
    const customElements = {
        points: data => <div>{data?.wallet_points?.data?.balance}</div>,
        email_verified: data => <div className="text-center text-bold">{data.email_verified ? "Confirmado" : "Pendiente"}</div>,
        enabled: data => <div className="text-center text-bold">{data.enabled ? "Activo" : "Inactivo"}</div>,
    };

    useEffect(async () => {
        Applications.on("ecosystem_users", data => {
            console.log(data);
            setData(data)})
        Applications.on("vecosystem_users", (data) => setView(data));
        Controller.getAll();
        if (props.match?.params?.id) {
            // await Controller.getById(props.match?.params?.id);
        }
    }, []);

    useEffect(() => {

    }, [view])


    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        goBack,
    }
}


export default EcosystemUsersApplication;
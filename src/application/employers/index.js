import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const EmployersApplication = (props) => {
    const [data, setData] = useState(Applications.state.employers)
    const [view, setView] = useState(null);
    const columns = Controller.columns;
    const customElements = {
        active: (data) => <div className="text-center text-bold">{data.active ? "Activo" : "Inactivo"}</div>,
        applications: (data) => <div className="text-center text-bold">{data.applications}</div>,
        applies: (data) => <div className="text-center text-bold">{data.applies}</div>,
        jobs: (data) => <div className="text-center text-bold">{data.jobs}</div>,
        views: (data) => <div className="text-center text-bold">{data.views}</div>,
    };

    useEffect(async () => {
        Applications.on("employers", data => setData(data))
        Applications.on("vemployer", (data) => setView(data));
        Controller.getAll();
        if (props.match?.params?.id) {
            await Controller.getById(props.match?.params?.id);
        }
    }, []);

    useEffect(() => {

    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/employers/${id}`);
    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        goBack,
    }
}


export default EmployersApplication;
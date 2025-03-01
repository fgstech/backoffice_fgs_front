import React, { useState, useEffect } from 'react'
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const JobsApplication = (props) => {
    const [data, setData] = useState(Applications.state.jobs)
    const [view, setView] = useState(null);
    const columns = Controller.columns;
    const customElements = {
        applications: (data) => <div className="text-center text-bold">{data.applications || 0}</div>,
        clicks: (data) => <div className="text-center text-bold">{data.clicks || 0}</div>,
        views: (data) => <div className="text-center text-bold">{data.views || 0}</div>,
        expired: (data) => <div className="text-center text-bold">{data.expired ? "Expirado" : "Activo"}</div>,
    };

    useEffect(async () => {
        Applications.on("jobs", data => setData(data))
        Applications.on("vjob", (data) => setView(data));
        Controller.getAll();
        if (props.match?.params?.id) {
            await Controller.getById(props.match?.params?.id);
        }
    }, []);

    useEffect(() => {

    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/jobs/${id}`);
    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        goBack,
    }
}


export default JobsApplication;
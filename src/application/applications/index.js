import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const ApplicationsJobsApplication = (props) => {
    const [data, setData] = useState(Applications.state.applications)
    const [view, setView] = useState(null);
    const columns = Controller.columns;
    const customElements = {};

    useEffect(async () => {
        Applications.on("applications", data => setData(data))
        Applications.on("vapplication", (data) => setView(data));
        Controller.getAll();
        if (props.match?.params?.id) {
            await Controller.getById(props.match?.params?.id);
        }
    }, []);

    useEffect(() => {
        
    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/applications/${id}`);
    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        goBack,
    }
}


export default ApplicationsJobsApplication;
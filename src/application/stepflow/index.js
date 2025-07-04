import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import FlowStepController from './controller';

const FlowStepsApplication = (props) => {
    const [flowsteps, setFlowsteps] = useState(Applications.state.flowsteps)
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState(null);
    const columns = FlowStepController.columns;
    const customElements = {
        actions: (data) => (
            <div>
                <IconButton onClick={() => goView(data.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
                <IconButton onClick={() => goAttendance(data.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.31 14.7L10.81 16.2L14.81 12.2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
            </div>
        ),
    };

    useEffect(async () => {
        Applications.on("flowsteps", data => setFlowsteps(data));
        Applications.on("vflowstep", (data) => setView(data));
        if (props.match?.params?.id) {
            setIsLoading(true);
            const v = await FlowStepController.getStepFlowById(props.match?.params?.id);
            setView(v);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            await FlowStepController.getStepFlows();
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        
    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/bootcamps/${id}`);
    const goBack = () => NavigationService.navigateBack();
    const create = () => {
        const data = {
            
        }

        FlowStepController.createStepFlow(data)
            .then(res => {
                Applications.notify({ title: "Exito!", type: "success", text: "success" })
                // setConfirmCreate(false);
            })
            .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    }

    return {
        flowsteps,
        columns,
        customElements,
        goBack,
        isLoading,
        create,
    }
}


export default FlowStepsApplication;
import React from "react";
import Controller from "../../../application/applications/index";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";

const ApplicationsJobsView = ({ ...props }) => {
    const {
        columns,
        data,
        customElements,
    } = Controller(props);

    return <>
        <ToolbarComponent label="Postulaciones laborales" showBackButton={false}>
            <DynamicTable
                headers={columns}
                data={data}
                customElements={customElements}
                tableLabel="Mis canjes"
                fullPage={true}
                showLabel={false}
            />
        </ToolbarComponent>
    </>
}

export default ApplicationsJobsView;
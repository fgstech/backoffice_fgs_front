import React from "react";
import Controller from "../../../application/profiles";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";

const ProfilesJobsView = ({ ...props }) => {
    const {
        columns,
        data,
        customElements,
    } = Controller(props);

    return <>
        <ToolbarComponent label="Perfiles Laborales" showBackButton={false}>
            <DynamicTable
                headers={columns}
                data={data}
                customElements={customElements}
                tableLabel="Mis canjes"
                fullPage={true}
                showLabel={false}
                itemsPerPage={50}
            />
        </ToolbarComponent>
    </>
}

export default ProfilesJobsView;
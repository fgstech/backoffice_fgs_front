import React from "react";
import Controller from "../../../application/employers";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";

const EmployersView = ({ ...props }) => {
    const {
        columns,
        data,
        customElements,
    } = Controller(props);

    return <>
        <ToolbarComponent label="Empleadores" showBackButton={false}>
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

export default EmployersView;
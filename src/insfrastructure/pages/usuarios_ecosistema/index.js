import React from "react";
import Controller from "../../../application/usuarios_ecosistema";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";

const EcosystemUsersView = ({ ...props }) => {
    const {
        columns,
        data,
        customElements,
    } = Controller(props);

    return <>
        <ToolbarComponent label="Usuarios ecosistema" showBackButton={false}>
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

export default EcosystemUsersView;
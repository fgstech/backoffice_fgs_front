import React from "react";
import BootcampsController from "../../../application/bootcamps";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";
import Loader from "../../ui/loader";
import './style.css';

const BootcampsView = ({ ...props }) => {
    const {
        bootcamps,
        columns,
        customElements,
        goBack,
        students,
        isLoading,
    } = BootcampsController(props);
    return <>
        <ToolbarComponent label="Bootcamps" showBackButton={false}>
            <DynamicTable
                headers={columns}
                data={bootcamps}
                customElements={customElements}
                fullPage={true}
                showLabel={false}
                loaderComponent={<Loader text="Cargando datos" />}
                isLoading={isLoading}
            />
        </ToolbarComponent>
    </>
}

export default BootcampsView;
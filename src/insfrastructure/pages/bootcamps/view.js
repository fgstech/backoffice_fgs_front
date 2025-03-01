import React from "react";
import BootcampsController from "../../../application/bootcamps";
import { Row, Col } from '../../ui/grid'
import ToolbarComponent from "../../ui/section";
import DynamicTable from "../../ui/table2";
import Loader from "../../ui/loader";

const BootcampView = ({ ...props }) => {
    const {
        goBack,
        students,
        view,
        studentsColumns,
        customElementsStudents,
        viewTitle,
        isLoading,
    } = BootcampsController(props);

    return <>
        <ToolbarComponent label={viewTitle} showBackButton={true} onBackClick={goBack}>
            <Row>
                <Col md={12}>
                    <DynamicTable
                        headers={studentsColumns}
                        data={students}
                        customElements={customElementsStudents}
                        fullPage={true}
                        showLabel={false}
                        itemsPerPage={50}
                        loaderComponent={<Loader text="Cargando datos" />}
                        isLoading={isLoading}
                    />
                </Col>
            </Row>
        </ToolbarComponent>
    </>
}

export default BootcampView;
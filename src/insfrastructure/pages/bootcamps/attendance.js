import React, { useState } from "react";
import BootcampsController from "../../../application/bootcamps";
import { Row, Col } from '../../ui/grid'
import ToolbarComponent from "../../ui/section";
import DynamicTable from "../../ui/table2";
import Loader from "../../ui/loader";
import AttendanceTable from "../../ui/attendance";
import { DatePicker } from "../../ui/dateCalendar/datePicker";
import { PrimaryButton } from "../../ui/button";

const BootcampAttendaceView = ({ ...props }) => {
    const {
        goBack,
        students,
        view,
        studentsColumns,
        customElementsStudents,
        viewTitle,
        isLoading,
        attendance,
        handleAttendanceChange,
        handleDateChange,
        selectedDate, 
        createAttendance
    } = BootcampsController(props);

    return <>
        <ToolbarComponent label={viewTitle} showBackButton={true} onBackClick={goBack}>
            <Row>
                <br />
                <Col md={12}>
                    <DatePicker label="Fecha de asistencia" onChange={handleDateChange}  minDate={new Date()} value={selectedDate}/>
                </Col>
                <Col md={12}>
                    <AttendanceTable students={attendance} onAttendanceChange={handleAttendanceChange} />
                </Col>
                <Col md={12} className="text-right mt-5">
                    <PrimaryButton text="Crear asistencia" onClick={createAttendance} />
                </Col>
            </Row>
        </ToolbarComponent>
    </>
}

export default BootcampAttendaceView;
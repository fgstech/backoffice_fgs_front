import React, { useState, useEffect } from 'react'
import { IconButton } from '../../insfrastructure/ui/button';
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import BootcampsController from './controller';

const BootcampsApplication = (props) => {
    const [bootcamps, setBootcamps] = useState(Applications.state.bootcamps)
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attendance, setAttendance] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [studentsColumns, setStudentsColumns] = useState([]);
    const [observations,setObservations] = useState(null);
    const [customElementsStudents, setCustomElementsStudents] = useState({
        asistenca: (data) => <div style={{ textAlign: "center", fontWeight: 600 }}>{data.asistenca === "NaN%" ? "0%" : data.asistenca}</div>,
        phone: (data) => data?.fields?.cf_numerodetelefono || "-",
    });
    const [view, setView] = useState(null);
    const [viewTitle, setViewTitle] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const columns = BootcampsController.columns;
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
        tags: data => data.tags.map(e => <span className="bootcamp-tag">{e}</span>)
    };

    useEffect(async () => {
        Applications.on("bootcamps", data => setBootcamps(data))
        Applications.on("vbootcamp", (data) => setView(data));
        if (props.match?.params?.id) {
            setIsLoading(true);
            const v = await BootcampsController.getBootcampsById(props.match?.params?.id);
            setView(v);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            await BootcampsController.getBootcamps();
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const dataStudents = view?.students || [];
        setStudents(dataStudents);
        setViewTitle(view?.title || "")
        console.log(dataStudents.map(e => {
            e["name"] = e.username;
            return e;
        }));

        const columns = BootcampsController.studentsColumns;
        const c = Object.assign({}, customElementsStudents);
        const studentData = dataStudents.map(e => {
            e["name"] = e.username;
            let totalAttendances = Object.values(e.attendances).length; // Total de registros
            let trueAttendances = Object.values(e.attendances).filter(value => value === true).length; // Cantidad de "true"
            let attendancePercentage = (trueAttendances / totalAttendances) * 100; // Cálculo del porcentaje
            e["asistenca"] = attendancePercentage.toFixed(0) + "%"; // Guardamos en el objeto con 2 decimales
            for (const [key, value] of Object.entries(e.attendances)) {
                e[key] = value;

                if (!columns.some(column => column.key === key)) {
                    columns.push({ key: key, label: key, style: { textAlign: "center" } });
                }

                if (!c[key]) {
                    c[key] = (data) => {
                        return (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {data[key] ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#2ecc71" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="#2ecc71" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.16998 14.83L14.83 9.17004" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.83 14.83L9.16998 9.17004" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>}
                            </div>
                        );
                    }

                }
            }
            return e;
        })

        setCustomElementsStudents(c);
        setStudentsColumns(columns);
        setAttendance(studentData);
    }, [view])

    const goView = (id) => NavigationService.navigateTo(`/bootcamps/${id}`);
    const goAttendance = (id) => NavigationService.navigateTo(`/bootcamps/attendance/${id}`);
    const goBack = () => NavigationService.navigateBack();

    const handleAttendanceChange = (updatedList) => {
        setAttendanceList(updatedList)
    };


    const handleDateChange = (updatedDate) => {
        setSelectedDate(updatedDate);
    };

    const createAttendance = () => {
        const data = {
            bootcampId: view.id,
            bootcampName: view.title,
            date: selectedDate,
            observations: observations,
            attendance: attendanceList.map(e => ({
                studentName: e.username,
                studentEmail: e.email,
                studentId: e.id,
                presence: e.attended,
                observation: e.observation,
            }))
        }

        BootcampsController.createAttendance(data)
            .then(res => Applications.notify({ title: "Exito!", type: "success", text: "success" }))
            .catch(err => Applications.notify({ title: "Error", type: "error", text: err }))
    }

    return {
        bootcamps,
        columns,
        customElements,
        goBack,
        students,
        studentsColumns,
        customElementsStudents,
        viewTitle,
        isLoading,
        attendance,
        handleAttendanceChange,
        handleDateChange,
        selectedDate,
        setSelectedDate,
        createAttendance,
        observations,
        setObservations,
    }
}


export default BootcampsApplication;
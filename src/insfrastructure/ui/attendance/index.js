import React, { useEffect, useState } from "react";
import "./AttendanceTable.css"; // Importar estilos opcionales
import Input from '../input'

const AttendanceTable = ({ students, onAttendanceChange }) => {
    // Estado para almacenar la asistencia de cada alumno
    const [attendance, setAttendance] = useState(
        students.map(student => ({ ...student, attended: false, observation: "" }))
    );

    useEffect(() => {
        setAttendance(students.map(student => ({ ...student, attended: false })));
    }, [students])

    // Función para manejar el cambio de asistencia
    const handleCheckboxChange = (index) => {
        const updatedAttendance = [...attendance];
        updatedAttendance[index].attended = !updatedAttendance[index].attended;
        setAttendance(updatedAttendance);

        // Llamar a la función onAttendanceChange para enviar los datos al componente padre
        if (onAttendanceChange) {
            onAttendanceChange(updatedAttendance);
        }
    };

    const handleChange = (index, value) => {
        const updatedAttendance = [...attendance];
        updatedAttendance[index].observation = value;
        setAttendance(updatedAttendance);
        if (onAttendanceChange) {
            onAttendanceChange(updatedAttendance);
        }
    };

    return (
        <div className="table-container">
            <label>Lista de Asistencia</label>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Asistencia</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((student, index) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <Input type="checkbox" value={student.attended} onChange={() => handleCheckboxChange(index)}  />
                            </td>
                            <td>
                                <Input type="text" value={student.observation} onChange={(e) => handleChange(index, e)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
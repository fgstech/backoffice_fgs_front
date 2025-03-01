import React, { useEffect, useState } from "react";
import "./AttendanceTable.css"; // Importar estilos opcionales

const AttendanceTable = ({ students, onAttendanceChange }) => {
    // Estado para almacenar la asistencia de cada alumno
    const [attendance, setAttendance] = useState(
        students.map(student => ({ ...student, attended: false }))
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

    return (
        <div className="table-container">
            <label>Lista de Asistencia</label>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((student, index) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={student.attended}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
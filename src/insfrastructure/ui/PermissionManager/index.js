import React, { useState, useEffect } from "react";
import "./PermissionManager.css"; 

const PermissionManager = ({ modules, userPermissions = [], onChange }) => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    useEffect(() => {
        if(userPermissions?.length > 1){
            setSelectedPermissions(userPermissions);
        }
    }, [userPermissions]);

    const togglePermission = (module, action) => {
        const permissionString = `${module}_${action}`;
        let updatedPermissions;

        if (selectedPermissions.includes(permissionString)) {
            updatedPermissions = selectedPermissions.filter(perm => perm !== permissionString);
        } else {
            updatedPermissions = [...selectedPermissions, permissionString];
        }

        setSelectedPermissions(updatedPermissions);
        if (onChange) onChange(updatedPermissions); // Devolver cambios al padre
    };

    return (
        <div className="permission-container">
            <table className="permission-table">
                <thead>
                    <tr>
                        <th>Módulo</th>
                        <th>Lectura</th>
                        <th>Escritura</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {modules.map(module => (
                        <tr key={module}>
                            <td>{module.toUpperCase()}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedPermissions.includes(`${module}_read`)}
                                    onChange={() => togglePermission(module, "read")}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedPermissions.includes(`${module}_write`)}
                                    onChange={() => togglePermission(module, "write")}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedPermissions.includes(`${module}_delete`)}
                                    onChange={() => togglePermission(module, "delete")}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermissionManager;
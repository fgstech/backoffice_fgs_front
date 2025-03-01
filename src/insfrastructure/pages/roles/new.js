import React from "react";
import RolesController from "../../../application/roles";
import "./style.css"
import Page from "../../ui/page";
import NavigationService from "../../../utils/history";
import PermissionManager from "../../ui/PermissionManager";
import Input from "../../ui/input";
import { Row, Col } from '../../ui/grid'
import { PrimaryButton } from "../../ui/button";
import { ModalConfirm } from '../../ui/modal2'
import ToolbarComponent from "../../ui/section";

const NewRoleView = ({ ...props }) => {
    const {
        modulesRole,
        rolPermissions,
        handlePermissionsChange,
        save,
        rolName,
        setRolName,
        confirmCreate,
        setConfirmCreate,
        edit,
        goBack,
    } = RolesController(props);

    return <>
        <Page>
            <ToolbarComponent label={edit ? "Editar rol" : "Nuevo Rol"} showBackButton={true} onBackClick={goBack}>
                <Row padding="0 20px">
                    <br />
                    <Col md={12}>
                        <Input label="Nombre" type="text" onChange={setRolName} value={rolName} />
                    </Col>
                    <Col md={12}>
                        <PermissionManager
                            modules={modulesRole}
                            userPermissions={rolPermissions}
                            onChange={handlePermissionsChange}
                        />
                    </Col>
                    <Col md={12} className="text-right">
                        <br />
                        <PrimaryButton onClick={() => setConfirmCreate(true)} text={edit ? "Editar rol" : "Crear rol"} />
                    </Col>
                </Row>
                <ModalConfirm isOpen={confirmCreate} onClose={() => setConfirmCreate(false)} onAccept={save} />
            </ToolbarComponent>
        </Page>
    </>
}

export default NewRoleView;
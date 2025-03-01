import React from "react";
import UsersController from "../../../application/users";
import "./style.css"
import Input from "../../ui/input";
import { Row, Col } from '../../ui/grid'
import { PrimaryButton } from "../../ui/button";
import { ModalConfirm } from '../../ui/modal2'
import ToolbarComponent from "../../ui/section";
import Select from "../../ui/InputSelect";

const NewUserView = ({ ...props }) => {
    const {
        save,
        name,
        setName,
        confirmCreate,
        setConfirmCreate,
        edit,
        goBack,
        roles,
        email, 
        setEmail,
        rol, 
        setRol,
    } = UsersController(props);

    return <>
        <ToolbarComponent label={edit ? "Editar usuario" : "Nuevo usuario"} showBackButton={true} onBackClick={goBack}>
            <Row padding="0 20px">
                <br />
                <Col md={12}>
                    <Input label="Nombre" type="text" onChange={setName} value={name} />
                </Col>
                <Col md={12}>
                    <Input label="Email" type="text" onChange={setEmail} value={email} />
                </Col>
                <Col md={12}>
                    <Select label="Rol de usuario" options={roles} value={rol} onChange={setRol} />
                </Col>
                <Col md={12} className="text-right">
                    <br />
                    <PrimaryButton onClick={() => setConfirmCreate(true)} text={edit ? "Editar usuario" : "Crear usuario"} />
                </Col>
            </Row>
            <ModalConfirm isOpen={confirmCreate} onClose={() => setConfirmCreate(false)} onAccept={save} />
        </ToolbarComponent>
    </>
}

export default NewUserView;
import React from 'react';
import ToolbarComponent from '../../ui/section';
import ProfileApplication from '../../../application/profile';
import { Col, Row } from '../../ui/grid';
import Input from '../../ui/input';
import { PrimaryButton } from '../../ui/button';
import { ModalConfirm } from '../../ui/modal2'

const ProfilePage = (props) => {
    const {
        name,
        setEmail,
        setName,
        email,
        password,
        setPassword,
        newPassword,
        setNewPassword,
        oldPassword,
        setOldPassword,
        callAction,
        callUpdatePassword,
        callUpdate,
        modalConfirm,
        setModelConfirm
    } = ProfileApplication(props);
    return (
        <>
            <ToolbarComponent label={"Mi perfil"} showBackButton={false}>
                <br />
                <Row padding="0 20px">
                    <Col md={12}>
                        <label style={{ fontSize: 18, marginBottom: 15 }}>Mis datos</label>
                    </Col>
                    <Col md={6}>
                        <Input label="Nombre" type="text" onChange={setName} value={name} />
                    </Col>
                    <Col md={6}>
                        <Input label="Email" type="text" onChange={setEmail} value={email} />
                    </Col>
                    <Col md={12} className="text-right">
                        <br />
                        <PrimaryButton onClick={callUpdate} text={"Actualizar datos"} />
                    </Col>
                </Row>
                <Row padding="0 20px">
                    <br />
                    <Col md={12}>
                        <label style={{ fontSize: 18, marginBottom: 15 }}>Actualizas password</label>
                    </Col>
                    <Col md={12}>
                        <Input label="Password actual" type="text" onChange={setOldPassword} value={oldPassword} />
                    </Col>
                    <Col md={6}>
                        <Input label="Nuevo password" type="text" onChange={setPassword} value={password} />
                    </Col>
                    <Col md={6}>
                        <Input label="Confirmar password" type="text" onChange={setNewPassword} value={newPassword} />
                    </Col>
                    <Col md={12} className="text-right">
                        <br />
                        <PrimaryButton onClick={callUpdatePassword} text={"Actualizar password"} />
                    </Col>
                </Row>
                <br />
                <br />
            </ToolbarComponent>
            <ModalConfirm isOpen={modalConfirm} onClose={() => setModelConfirm(false)} onAccept={callAction} />
        </>
    )
}

export default ProfilePage;
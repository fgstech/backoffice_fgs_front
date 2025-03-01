import React from "react";
import UsersController from "../../../application/users";
import "./style.css"
import Page from "../../ui/page";
import DynamicTable from "../../ui/table2";
import FloatingButton from '../../ui/floatButton';
import { ModalConfirm } from '../../ui/modal2';
import ToolbarComponent from "../../ui/section";

const UserView = ({ ...props }) => {
    const {
        columns,
        users,
        customElements,
        removeModal,
        setRemoveModal,
        goNew,
        remove
    } = UsersController(props);

    return <>
        <ToolbarComponent label="Usuarios de sistema" showBackButton={false}>
            <DynamicTable
                headers={columns}
                data={users}
                customElements={customElements}
                tableLabel="Mis canjes"
                fullPage={true}
                showLabel={false}
            />
            <FloatingButton position="bottom-right" onClick={goNew}></FloatingButton>
            <ModalConfirm isOpen={removeModal} onClose={() => setRemoveModal(false)} onAccept={remove} />
        </ToolbarComponent>
    </>
}

export default UserView;
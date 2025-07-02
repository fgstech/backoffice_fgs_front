import React from "react";
import RoleController from "../../../application/roles";
import "./style.css"
import Page from "../../ui/page";
import DynamicTable from "../../ui/table2";
import FloatingButton from "../../ui/floatButton";
import { ModalConfirm } from "../../ui/modal2";
import ToolbarComponent from "../../ui/section";

const RoleView = ({ ...props }) => {
    const {
        columns,
        roles,
        customElements,
        goView,
        openRemove,
        setOpenRemove,
        remove,
        goBack,
        goNew
    } = RoleController(props);
    return <>
        <Page>
            <ToolbarComponent label="Roles de usuario" showBackButton={false} onBackClick={goBack}>
                <DynamicTable
                    headers={columns}
                    data={roles}
                    customElements={customElements}
                    fullPage={true}
                    showLabel={false}
                />
                <FloatingButton position="bottom-right" onClick={goNew}></FloatingButton>
                <ModalConfirm isOpen={openRemove} onClose={() => setOpenRemove(false)} onAccept={remove} />
            </ToolbarComponent>
        </Page>
    </>
}

export default RoleView;
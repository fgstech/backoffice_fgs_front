import React from 'react';
import QuizzController from "../../../application/quizz";
import ToolbarComponent from '../../ui/section';
import DynamicTable from '../../ui/table2';
import Loader from '../../ui/loader';
import { ModalConfirm } from '../../ui/modal2';
import FloatingButton from '../../ui/floatButton';

const QuizzesPage = (props) => {
    const { columns, quizzes, customElements, isLoading, removeModal, setRemoveModal, remove, newquizz } = QuizzController(props);
    return (
        <>
            <ToolbarComponent label="Quizzes" showBackButton={false}>
                <DynamicTable
                    headers={columns}
                    data={quizzes}
                    customElements={customElements}
                    fullPage={true}
                    showLabel={false}
                    loaderComponent={<Loader text="Cargando datos" />}
                    isLoading={isLoading}
                />
            </ToolbarComponent>
            <ModalConfirm isOpen={removeModal} onClose={() => setRemoveModal(false)} onAccept={remove} />
            <FloatingButton text="Nuevo quizz" onClick={newquizz} />
        </>
    )
}

export default QuizzesPage;
import React from 'react';
import QuizBuilder from "./flow";
import QuizzController from "../../../application/quizz";

const QuizViewPage = (props) => {
    const { update, quizz, goBack } = QuizzController(props);
    return (
        <QuizBuilder goBack={goBack} editMode={true} initialData={quizz} onSubmit={(data) => update(data)} />
    )
}

export default QuizViewPage;
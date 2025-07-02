import React from 'react';
import QuizBuilder from "./flow";
import QuizzController from "../../../application/quizz";
import ToolbarComponent from '../../ui/section';

const QuizBuilderPage = (props) => {
    const { create, goBack } = QuizzController(props);
    return (
        <QuizBuilder onSubmit={(data) => create(data)} goBack={goBack} />
    )
}

export default QuizBuilderPage;
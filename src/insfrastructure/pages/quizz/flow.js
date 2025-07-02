import React, { useEffect, useState } from 'react';
import Input from '../../ui/input';
import Select from '../../ui/InputSelect';
import { PrimaryButton, DangerButton } from '../../ui/button';
import FloatingButton from "../../ui/floatButton"
import './QuizBuilder.css';

const initialOption = { text: '', value: '' };
const initialQuestion = {
    questionText: '',
    type: 'single',
    options: [structuredClone(initialOption)],
    correctAnswers: [],
    experience: 0
};

const slugify = (str) =>
    str.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');

const QuizBuilder = ({ onSubmit, initialData, editMode = false, goBack }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quizPoints, setQuizPoints] = useState(0);
    const [questions, setQuestions] = useState([structuredClone(initialQuestion)]);
    const [error, setError] = useState(null);
    const [random, setRandom] = useState(false);
    const [percent, setPercent] = useState(100);
    const [multiple, setMultiple] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setQuizPoints(initialData.settings?.points || 0);
            setMultiple(initialData.settings?.allowMultipleSubmissions || false);
            console.log(initialData.settings)
            setRandom(initialData.settings?.shuffleQuestions || false);
            setQuestions(initialData.questions || [structuredClone(initialQuestion)]);
        }
    }, [initialData]);

    const handleChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex].text = value;
        updated[qIndex].options[oIndex].value = slugify(value);
        setQuestions(updated);
    };

    const handleRemoveOption = (qIndex, oIndex) => {
        const updated = [...questions];
        updated[qIndex].options.splice(oIndex, 1);
        const valueToRemove = updated[qIndex].options[oIndex]?.value;
        updated[qIndex].correctAnswers = updated[qIndex].correctAnswers.filter(v => v !== valueToRemove);

        setQuestions(updated);
    };

    const handleCorrectAnswer = (qIndex, value) => {
        const updated = [...questions];
        const question = updated[qIndex];

        if (['single', 'text', 'numeric'].includes(question.type)) {
            question.correctAnswers = [value];
        } else {
            question.correctAnswers = question.correctAnswers.includes(value)
                ? question.correctAnswers.filter(v => v !== value)
                : [...question.correctAnswers, value];
        }

        setQuestions(updated);
    };

    const handleAddOption = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].options.push(structuredClone(initialOption));
        setQuestions(updated);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, structuredClone(initialQuestion)]);
    };

    const handleRemoveQuestion = (index) => {
        if (questions.length === 1) return;
        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
    };

    const validateForm = () => {
        if (!title.trim()) return 'El título es obligatorio.';
        if (questions.some(q => !q.questionText.trim())) return 'Todas las preguntas deben tener texto.';
        return null;
    };

    const normalizedQuestions = questions.map(q => {
        const cleaned = { ...q };
        if (!['single', 'multiple'].includes(q.type)) {
            cleaned.options = [];
        } else {
            cleaned.options = q.options.filter(opt => opt.text?.trim() && opt.value?.trim());
        }

        cleaned.correctAnswers = q.correctAnswers.filter(ans => ans !== '' && ans !== null && ans !== undefined);
        return cleaned;
    });

    const handleSubmit = () => {
        const errorMsg = validateForm();
        if (errorMsg) return setError(errorMsg);

        const template = {
            title,
            description,
            questions: normalizedQuestions,
            settings: {
                allowMultipleSubmissions: multiple,
                maxAttempts: 1,
                shuffleQuestions: random,
                points: parseInt(quizPoints),
                minimumCorrectPercentage: percent
            }
        };
        setError(null);
        onSubmit(template);
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'single': return 'Respuesta única';
            case 'multiple': return 'Respuesta múltiple';
            case 'text': return 'Respuesta abierta (texto)';
            case 'numeric': return 'Respuesta numérica';
            default: return '';
        }
    };

    return (
        <div className="quiz-builder">
            <div className="grid-quizz">
                <div>
                    <div className="grid-goback">
                        <button className="back-button" onClick={goBack}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="white" />
                            </svg>
                            Volver
                        </button>
                        {editMode ? <h4>Modificar {initialData?.title}</h4> : <h4>Crear un nuevo Quiz</h4>}
                    </div>
                </div>
                <div>
                    <PrimaryButton text="Guardar formulario" onClick={handleSubmit} />
                </div>
            </div>

            {error && <div className="error">{error}</div>}

            <Input label="Título del formulario" value={title} onChange={setTitle} />
            <Input label="Descripción del formulario" type="textarea" value={description} onChange={setDescription} />

            <div className="grid-settings">
                <div>
                    <Input type="checkbox" value={multiple} onChange={(val) => setMultiple(val)} label="Permitir múltiples envíos" />
                </div>
                <div>
                    <Input type="checkbox" value={random} onChange={(val) => setRandom(val)} label="Preguntas aleatoriamente" />
                </div>
                <div>
                    <Input type="percentage" minPercentage={10} value={percent} onChange={(val) => setPercent(val)} label="Porcentaje requerido para ganar los ñamis" />
                </div>
                <div>
                    <Input label="Puntos Ñamis" type="number" value={quizPoints} onChange={setQuizPoints} />
                </div>
            </div>

            {questions.map((q, qi) => (
                <div key={qi} className="question">
                    <div className="question-header">
                        <h4>Pregunta {qi + 1}</h4>
                        {questions.length > 1 && (
                            <DangerButton text="Eliminar" onClick={() => handleRemoveQuestion(qi)} />
                        )}
                    </div>

                    <Input label="Texto de la pregunta" value={q.questionText} onChange={(val) => handleChange(qi, 'questionText', val)} />

                    <div className="grid-config-response">
                        <div>
                            <Select
                                label="Tipo de respuesta"
                                value={{ value: q.type, label: getTypeLabel(q.type) }}
                                options={[
                                    { value: 'single', label: 'Respuesta única' },
                                    { value: 'multiple', label: 'Respuesta múltiple' },
                                    { value: 'text', label: 'Respuesta abierta (texto)' },
                                    { value: 'numeric', label: 'Respuesta numérica' }
                                ]}
                                onChange={(opt) => handleChange(qi, 'type', opt.value)}
                            />
                        </div>
                        <div>
                            <Input
                                label="Puntos de experiencia"
                                type="number"
                                value={q.experience}
                                onChange={(val) => handleChange(qi, 'experience', Number(val))}
                            />
                        </div>
                    </div>

                    {['single', 'multiple'].includes(q.type) && (
                        <div className="options">
                            <label>Opciones</label>
                            {q.options.map((opt, oi) => (
                                <div key={oi} className="option">
                                    <div className="grid-option-response">
                                        <div>
                                            <Input
                                                placeholder="Texto de opción"
                                                value={opt.text}
                                                onChange={(val) => handleOptionChange(qi, oi, val)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type={q.type === 'single' ? 'radio' : 'checkbox'}
                                                name={`correct-${qi}`}
                                                value={q.correctAnswers.includes(opt.value)}
                                                onChange={() => handleCorrectAnswer(qi, opt.value)}
                                                checkLabel="Correcta"
                                            />
                                        </div>
                                        <div>
                                            {q.options.length > 1 && (
                                                <DangerButton
                                                    text="✖"
                                                    type="text"
                                                    onClick={() => handleRemoveOption(qi, oi)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <PrimaryButton text="➕ Agregar opción" onClick={() => handleAddOption(qi)} type="text" />
                        </div>
                    )}

                    {['text', 'numeric'].includes(q.type) && (
                        <div className="correct-answer-text">
                            <Input
                                label="Respuesta correcta esperada"
                                type={q.type === 'numeric' ? 'number' : 'text'}
                                value={q.correctAnswers[0] || ''}
                                onChange={(val) => handleCorrectAnswer(qi, val)}
                            />
                        </div>
                    )}
                </div>
            ))}

            <FloatingButton text="Agregar pregunta" onClick={handleAddQuestion} />
            <br />
            <br />
            <br />
        </div>
    );
};

export default QuizBuilder;
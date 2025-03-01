import React, { useState } from "react";
import "./WorkStatusChat.css"; // Agrega los estilos aquí

const WorkStatusChat = () => {
    const [isOpen, setIsOpen] = useState(false); // Controla si el chat está abierto
    const [stepIndex, setStepIndex] = useState(0); // Índice del paso actual
    const [userResponses, setUserResponses] = useState({}); // Respuestas del usuario
    const [textInput, setTextInput] = useState(""); // Controla el input de texto
    const [history, setHistory] = useState([]); // Guarda los pasos anteriores

    // Definir el flujo dentro del componente con diferentes tipos de inputs
    const flowSteps = [
        {
            id: "step1",
            type: "buttons",
            question: "¿ESTÁS TRABAJANDO?",
            options: [
                { value: "yes", label: "Sí", nextStep: "step2" },
                { value: "no", label: "No", nextStep: "step3" }
            ]
        },
        {
            id: "step2",
            type: "buttons",
            question: "¿CÓMO ENCONTRASTE TRABAJO?",
            options: [
                { value: "actively", label: "ÑAM Talentos", nextStep: "step10" },
                { value: "casually", label: "Autogestionado", nextStep: "end" },
            ]
        },
        {
            id: "step3",
            type: "buttons",
            question: "¿A QUÉ DEDICAS TU TIEMPO ACTUALMENTE?",
            options: [
                { value: "job_hunting", label: "BUSCANDO TRABAJO", nextStep: "end" },
                { value: "entrepreneurship", label: "EMPRENDIENDO", nextStep: "step4" },
                { value: "studying", label: "ESTUDIANDO", nextStep: "step7" },
                { value: "inactive", label: "INACTIVIDAD", nextStep: "end" }
            ]
        },
        {
            id: "step4",
            type: "text",
            question: "¿QUÉ PRODUCTO O SERVICIO OFRECES?",
            nextStep: "step5"
        },
        {
            id: "step5",
            type: "buttons",
            question: "¿TU EMPRENDIMIENTO ES FORMAL?",
            options: [
                { value: "yes", label: "Sí", nextStep: "step6" },
                { value: "no", label: "No", nextStep: "step6" }
            ]
        },
        {
            id: "step6",
            type: "buttons",
            question: "¿CANAL DE COMERCIALIZACIÓN?",
            options: [
                { value: "online", label: "ONLINE", nextStep: "end" },
                { value: "physical", label: "PRESENCIAL", nextStep: "end" },
                { value: "both", label: "AMBOS", nextStep: "end" },
            ]
        },
        {
            id: "step7",
            type: "buttons",
            question: "¿TIPO DE ESTUDIOS?",
            options: [
                { value: "technical", label: "TÉCNICOS", nextStep: "step8" },
                { value: "university", label: "UNIVERSITARIOS", nextStep: "step8" },
                { value: "bootcamp", label: "BOOTCAMPS", nextStep: "step8" },
            ]
        },
        {
            id: "step8",
            type: "buttons",
            question: "¿RUBRO?",
            options: [
                { value: "gastronomy", label: "GASTRONOMÍA", nextStep: "step9" },
                { value: "other", label: "OTRO", nextStep: "step11" },
            ]
        },
        {
            id: "step9",
            type: "buttons",
            question: "¿INTENCIÓN PROFESIONAL EN GASTRONOMÍA?",
            options: [
                { value: "yes", label: "Sí", nextStep: "end" },
                { value: "no", label: "No", nextStep: "end" },
            ]
        },
        {
            id: "step10",
            type: "select",
            question: "¿UBICACIÓN?",
            options: [
                { value: "city", label: "Ciudad", nextStep: "step11" },
                { value: "suburb", label: "Suburbios", nextStep: "step11" },
            ]
        },
        {
            id: "step11",
            type: "text",
            question: "¿Cuál es tu rubro?",
            nextStep: "step9"
        }
    ];

    const close = () => {
        setIsOpen(false);
        setStepIndex(0);
        setUserResponses({});
        setTextInput("");
        setHistory([]);
    };

    const handleResponse = (answer, nextStep) => {
        setUserResponses(prevResponses => ({
            ...prevResponses,
            [flowSteps[stepIndex].id]: answer
        }));

        setTextInput(""); // Limpia el campo de texto después de enviar la respuesta

        if (nextStep === "end") {
            console.log("Respuestas del usuario:", userResponses);
            setStepIndex(flowSteps.length);
        } else {
            const nextIndex = flowSteps.findIndex(step => step.id === nextStep);
            if (nextIndex !== -1) {
                setHistory(prevHistory => [...prevHistory, stepIndex]); // Guarda el paso actual en el historial
                setStepIndex(nextIndex);
            }
        }
    };

    const goBack = () => {
        if (history.length > 0) {
            const prevStepIndex = history[history.length - 1];
            setHistory(prevHistory => prevHistory.slice(0, -1)); // Elimina el último paso del historial
            setStepIndex(prevStepIndex);
        }
    };

    return (
        <div className={`chat-container ${isOpen ? "open" : ""}`}>
            <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
                ¿Estado Laboral?
            </div>

            {isOpen && (
                <div className="chat-body">
                    {stepIndex >= flowSteps.length ? (
                        <div>
                            <p>¡Gracias por actualizar tu información!</p>
                            <button className="button-close" onClick={close}>
                                Cerrar
                            </button>
                        </div>
                    ) : (
                        <div className="chat-message">
                            <p>{flowSteps[stepIndex]?.question}</p>

                            {flowSteps[stepIndex]?.type === "buttons" && (
                                <div className="options">
                                    {flowSteps[stepIndex]?.options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleResponse(option.value, option.nextStep)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {flowSteps[stepIndex]?.type === "select" && (
                                <select
                                    onChange={(e) => {
                                        const selectedOption = flowSteps[stepIndex]?.options.find(opt => opt.value === e.target.value);
                                        if (selectedOption) {
                                            handleResponse(e.target.value, selectedOption.nextStep);
                                        }
                                    }}
                                >
                                    <option value="">Selecciona una opción</option>
                                    {flowSteps[stepIndex]?.options.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            )}

                            {flowSteps[stepIndex]?.type === "text" && (
                                <div className="text-input-container">
                                    <input
                                        type="text"
                                        placeholder="Escribe tu respuesta"
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                    />
                                    <button
                                        className="send-button"
                                        onClick={() => handleResponse(textInput, flowSteps[stepIndex]?.nextStep)}
                                        disabled={!textInput.trim()}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            )}

                            {history.length > 0 && (
                                <button className="back-button" onClick={goBack}>
                                    ← Volver
                                </button>
                            )}

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkStatusChat;
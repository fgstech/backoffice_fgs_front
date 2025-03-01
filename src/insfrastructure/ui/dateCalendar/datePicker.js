import React, { useState, useEffect, useRef } from "react";
import "./DatePicker.css"; // Importar estilos

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
const getMonthName = (monthIndex) => [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
][monthIndex];
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const compareDates = (date1, date2) => date1 && date2 &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

const isDateBetween = (date, startDate, endDate) => startDate && endDate && date >= startDate && date <= endDate;

const isDateInRange = (date, minDate, maxDate) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
};

const getWeekdays = (firstDayOfWeek) => {
    const days = ["D", "L", "M", "M", "J", "V", "S"];
    return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
};

export const DatePicker = ({
    onChange,
    onRangeChange,
    range = false,
    disabledDays = [],
    minDate = null,
    maxDate = null,
    label = null,
    firstDayOfWeek = 1,
    value = null
}) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const pickerRef = useRef(null);

    const minYear = minDate ? minDate.getFullYear() : 1900;
    const maxYear = maxDate ? maxDate.getFullYear() : today.getFullYear();
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    useEffect(() => {
        if (value) {
            const newDate = new Date(value);
            setSelectedDate(newDate);
            setCurrentYear(newDate.getFullYear());
            setCurrentMonth(newDate.getMonth());
        }
    }, [value]);

    const changeMonth = (month) => {
        setCurrentMonth(month);
    };

    const changeYear = (year) => {
        setCurrentYear(year);
    };

    const handleDayClick = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (!isDateInRange(date, minDate, maxDate)) return;

        if (range) {
            if (!startDate || (startDate && endDate)) {
                setStartDate(date);
                setEndDate(null);
                if (onRangeChange) onRangeChange({ start: date, end: null });
            } else if (startDate && !endDate && date >= startDate) {
                setEndDate(date);
                setVisible(false);
                if (onRangeChange) onRangeChange({ start: startDate, end: date });
            }
        } else {
            setSelectedDate(date);
            setVisible(false);
            if (onChange) onChange(date);
        }
    };

    const formatDate = (date) => date ? date.toLocaleDateString("es-ES") : "";

    const isDayDisabled = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (!isDateInRange(date, minDate, maxDate)) return true;
        if (disabledDays.includes(date.getDay())) return true;
        return false;
    };

    const weekdays = getWeekdays(firstDayOfWeek);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="date-picker" ref={pickerRef}>
            <div className="relative inputTime">
                {label && <label className="InputLabel">{label}</label>}
                <input
                    type="text"
                    readOnly
                    value={range && startDate ? `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "..."}` : formatDate(selectedDate)}
                    onClick={() => setVisible(!visible)}
                    className="date-input"
                />
            </div>

            {visible && (
                <div className="calendar">
                    <div className="header">
                        <select value={currentYear} onChange={(e) => changeYear(Number(e.target.value))} className="year-selector">
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        <select value={currentMonth} onChange={(e) => changeMonth(Number(e.target.value))} className="month-selector">
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {getMonthName(i)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="weekdays">
                        {weekdays.map((day, index) => (
                            <div key={index}>{day}</div>
                        ))}
                    </div>

                    <div className="days">
                        {Array(getFirstDayOfMonth(currentYear, currentMonth))
                            .fill(null)
                            .map((_, index) => (
                                <div key={index}></div>
                            ))}
                        {Array.from({ length: getDaysInMonth(currentYear, currentMonth + 1) }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(currentYear, currentMonth, day);
                            const isSelected = !range && compareDates(date, selectedDate);
                            const isInRange = range && startDate && endDate && isDateBetween(date, startDate, endDate);
                            const isToday = compareDates(date, today);

                            return (
                                <div
                                    key={day}
                                    className={`day ${isDayDisabled(day) ? "disabled" : ""} 
                                        ${isSelected ? "selected" : ""} 
                                        ${isInRange ? "in-range" : ""} 
                                        ${isToday ? "today" : ""}`}
                                    onClick={() => !isDayDisabled(day) && handleDayClick(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
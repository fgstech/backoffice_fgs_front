import React, { useState, useEffect } from 'react'
import Applications from '../Applications';
import NavigationService from '../../utils/history';
import Controller from './controller';

const EmployerReportApplication = (props) => {
    const [data, setData] = useState(Applications.state.jobs)
    const [summary, setSummary] = useState({});
    const [report, setReport] = useState([])
    const [employmentDistribution, setEmploymentDistribution] = useState([])
    const [employmentSource, setEmploymentSource] = useState([])
    const [commercialization, setCommercialization] = useState([])
    const [studyType, setStudyType] = useState([])
    const [incomeRange, setIncomeRange] = useState([])
    const [workMode, setWorkMode] = useState([])
    const [professionalIntention, setProfessionalIntention] = useState([])
    const [studyField, setStudyField] = useState([])
    const [reportJboard, setReportJboard] = useState({})
    const [activeTab, setActiveTab] = useState(1);

    const columns = Controller.columns;
    const customElements = {
        occupation: (data) => {
            const value = data?.occupation;
            if (value === "working") return "Trabajando";
            else if (value === "study") return "Estudiando";
            else if (value === "entrepreneurship") return "Emprendiendo"
        },
        cw_through: (data) => data?.currentWork?.through,
        cw_where: (data) => data?.currentWork?.where,
        cw_income_range: (data) => data?.currentWork?.income_range,
        cw_Mode: (data) => data?.currentWork?.Mode,
    };

    useEffect(async () => {
        Applications.on("summary_employing", data => {
            setSummary(data);
            setData(data.detailedReport);
            setEmploymentDistribution(Controller.parseDataByEmploymentDistributionChart(data.summary.employmentDistribution))
            setEmploymentSource(Controller.parseDataByEmploymentSourceChart(data.summary.employmentSource));
            setCommercialization(Controller.parseChannelCommercializationChart(data.summary.commercialization));
            setStudyType(Controller.parseStudyTypedChart(data.summary.studyType));
            setIncomeRange(Controller.parseDataIncomeRangeChart(data.summary.incomeRange));
            setWorkMode(Controller.parseDataWorkModeChart(data.summary.workMode));
            setProfessionalIntention(Controller.parseProfessionalIntentionChart(data.summary.professionalIntention));
            setStudyField(Controller.parseStudyFieldChart(data.summary.studyField));
        })
        Applications.on("report_employing", data => setReport(Controller.parseDataEmploymentChart(data)))
        Applications.on("jobboard_report", data => setReportJboard(data))

        const yearsData = [
            { year: 2025, meta: 100, includeEntrepreneurship: true },
            { year: 2026, meta: 120, includeEntrepreneurship: true },
            { year: 2027, meta: 150, includeEntrepreneurship: true }
        ];

        await Controller.generateEmploymentSummary();
        await Controller.jobboardReport();
        await Controller.byyears(yearsData);
    }, []);

    const goView = (id) => NavigationService.navigateTo(`/jobs/${id}`);
    const goBack = () => NavigationService.navigateBack();

    return {
        data,
        columns,
        customElements,
        summary,
        report,
        goBack,
        employmentDistribution,
        employmentSource,
        commercialization,
        studyType,
        incomeRange,
        workMode,
        activeTab,
        setActiveTab,
        professionalIntention,
        studyField,
        reportJboard,
    }
}


export default EmployerReportApplication;
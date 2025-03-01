import React from "react";
import Controller from "../../../application/employment_report";
import DynamicTable from "../../ui/table2";
import ToolbarComponent from "../../ui/section";
import { Row, Col } from "../../ui/grid";
import { TabsNavbar, TabsContent } from '../../ui/tabsbar';
import BarChart from '../../ui/charts/barchart';
import PolarChart from "../../ui/charts/polarChart"
import StatsCard from "../../ui/cardStats";

const EmployerReportView = ({ ...props }) => {
    const {
        columns,
        data,
        customElements,
        report,
        employmentDistribution,
        employmentSource,
        commercialization,
        studyType,
        professionalIntention,
        studyField,
        incomeRange,
        workMode,
        activeTab,
        reportJboard,
        setActiveTab,
    } = Controller(props);

    const tabs = [
        { id: 1, label: 'Datos empleabilidad', content: <TabsContentData columns={columns} customElements={customElements} data={data} /> },
        { id: 2, label: 'Graficos empleabilidad', content: <TabsContentEmpleabilidad studyType={studyType} professionalIntention={professionalIntention} studyField={studyField} commercialization={commercialization} workMode={workMode} incomeRange={incomeRange} employmentDistribution={employmentDistribution} report={report} employmentSource={employmentSource} /> },
        { id: 3, label: 'JobBoard', content: <TabsContentJobboard data={reportJboard} /> },
    ];

    return <>
        <ToolbarComponent label="Reporteria Talentos" showBackButton={false}>
            <TabsNavbar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
            <br />
            <TabsContent tabs={tabs} activeTab={activeTab} />
        </ToolbarComponent>
    </>
}

export default EmployerReportView;


const TabsContentEmpleabilidad = ({ report, employmentSource, employmentDistribution, incomeRange, workMode, commercialization, studyType, professionalIntention, studyField, ...props }) => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <BarChart data={report} title="Meta vs Empleados por Año" />
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col md={4}>
                    <PolarChart data={incomeRange} title="Distribución salarial" />

                </Col>
                <Col md={4}>
                    <PolarChart data={employmentDistribution} title="Distribución de ocupación" />

                </Col>
                <Col md={4}>
                    <PolarChart data={workMode} title="Distribución Modalidad de trabajo" />

                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col md={4}>
                    <PolarChart data={employmentSource} title="Distribución plataforma de trabajo" />

                </Col>
                <Col md={4}>
                    <PolarChart data={commercialization} title="Distribución de canales de comercialización" />

                </Col>
                <Col md={4}>
                    <PolarChart data={studyType} title="Distribución de Tipos de estudio" />

                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col md={4}>
                    <PolarChart data={professionalIntention} title="Distribución de Intencion en gastronomia" />

                </Col>
                <Col md={4}>
                    <PolarChart data={studyField} title="Distribución de campos de estudio" />
                </Col>
                <Col md={4}>
                </Col>
            </Row>

            <br />
        </>
    )
}

const TabsContentData = ({ columns, customElements, data, ...props }) => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <DynamicTable
                        headers={columns}
                        data={data}
                        customElements={customElements}
                        fullPage={true}
                        showLabel={false}
                        itemsPerPage={50}
                    />
                </Col>
            </Row>
        </>
    )
}

const TabsContentJobboard = ({ data, ...props }) => {
    if (!data || Object.keys(data).length === 0) return <p>No hay datos disponibles...</p>;
    const employers = data?.employersStats;
    const jobs = data?.jobsStats;
    const applications = data?.applicationsStats;

    return (
        <>
            <Row>
                <Col md={12}>
                    <h6 className="my-3">Empleadores</h6>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <StatsCard title="Empleadores inscritos" value={employers.activeEmployers} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Empleadores Activos" value={employers.activeEmployers} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Promedio de visualizacion" value={`${employers.avgViews}%`} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Promedio de aplicacion" value={`${employers.avgApplications}%`} />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h6 className="my-3">Trabajos</h6>
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <StatsCard title="Trabajos publicados" value={jobs.totalJobs} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Trabajos Activos" value={jobs.activeJobs} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Trabajos Expirados" value={jobs.expiredJobs} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Trabajos Recientes" value={jobs.recentJobs} />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h6 className="my-3">Postulaciones</h6>
                </Col>
            </Row>

            

            <Row>
                <Col md={3}>
                    <StatsCard title="Empleadores inscritos" value={employers.activeEmployers} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Empleadores Activos" value={employers.activeEmployers} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Promedio de visualizacion" value={`${employers.avgViews}%`} />
                </Col>
                <Col md={3}>
                    <StatsCard title="Promedio de aplicacion" value={`${applications.avgApplicationsPerApplicant}%`} />
                </Col>
            </Row>
        </>
    )
}
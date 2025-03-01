import EmploymentReportAPI from "../../api/employment_report";
import Applications from "../Applications";

const colors = [
    'rgba(0, 123, 255, 0.2)',   // Azul original claro
    'rgba(255, 99, 132, 0.2)',  // Rojo claro
    'rgba(255, 206, 86, 0.2)',  // Amarillo suave
    'rgba(75, 192, 192, 0.2)',  // Verde agua
    'rgba(153, 102, 255, 0.2)', // Púrpura claro
    'rgba(255, 159, 64, 0.2)'   // Naranja
];


const borderColors = [
    'rgba(0, 123, 255, 1)',    // Azul original
    'rgba(255, 99, 132, 1)',   // Rojo intenso
    'rgba(255, 206, 86, 1)',   // Amarillo vibrante
    'rgba(75, 192, 192, 1)',   // Verde agua
    'rgba(153, 102, 255, 1)',  // Púrpura intenso
    'rgba(255, 159, 64, 1)'    // Naranja fuerte
];



class EmployerReportController {
    columns = [
        { key: 'email', label: 'Email' },
        { key: 'occupation', label: 'Ocupación actual' },
        { key: 'cw_through', label: 'Plataforma' },
        { key: 'cw_where', label: 'Lugar de trabajo' },
        { key: 'cw_income_range', label: 'Rango salarial' },
        { key: 'cw_Mode', label: 'Modalidad' },
    ];

    async generateEmploymentSummary() {
        return new Promise((resolve, reject) => {
            EmploymentReportAPI.generateEmploymentSummary()
                .then(res => {
                    const summary_employing = res.data;
                    console.log("Summary >", summary_employing);
                    Applications.updateState(state => ({ summary_employing }));
                    resolve(summary_employing);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async jobboardReport() {
        return new Promise((resolve, reject) => {
            EmploymentReportAPI.jobboardReport()
                .then(res => {
                    const jobboard_report = res.data;
                    console.log("jobboard_report >", jobboard_report);
                    Applications.updateState(state => ({ jobboard_report }));
                    resolve(jobboard_report);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async generateEmploymentSummaryDate(startDate, endDate) {
        return new Promise((resolve, reject) => {
            EmploymentReportAPI.generateEmploymentSummaryDate(startDate, endDate)
                .then(res => {
                    const summary_employing = res.data;
                    console.log(summary_employing);
                    Applications.updateState(state => ({ summary_employing }));
                    resolve(summary_employing);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    async byyears(data) {
        return new Promise((resolve, reject) => {
            EmploymentReportAPI.byyears(data)
                .then(res => {
                    const report_employing = res.data;
                    console.log(report_employing);
                    Applications.updateState(state => ({ report_employing }));
                    resolve(report_employing);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
        })
    }

    parseDataByEmploymentDistributionChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "Employed") {
                labels["Empleados"] = data[d];
            } else if (d === "Unemployed") {
                labels["Desempleados"] = data[d];
            } else if (d === "Entrepreneurship") {
                labels["Emprendiendo"] = data[d];
            } else if (d === "Studying") {
                labels["Estudiando"] = data[d];
            } else if (d === "Inactive") {
                labels["Inactivo"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColors: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseDataByEmploymentSourceChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "actively") {
                labels["Talentos"] = data[d];
            } else if (d === "casually") {
                labels["Autogestionado"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: '# de Modalidad',
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseDataEmploymentChart(data) {
        if (!data || data.length === 0) return null;
        return {
            labels: data.map(item => item.year), // Años
            datasets: [
                {
                    label: "Meta",
                    data: data.map(item => item.meta),
                    backgroundColor: colors[0],
                    borderColors: borderColors[0],
                    borderWidth: 1
                },
                {
                    label: "Empleados",
                    data: data.map(item => item.totalEmployed),
                    backgroundColor: colors[1],
                    borderColors: borderColors[1],
                    borderWidth: 1
                }
            ]
        };
    }

    parseDataIncomeRangeChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        // return {
        //     labels: Object.keys(data), // Años
        //     datasets: Object.keys(data).map((e, i) => ({
        //         label: e,
        //         data: [data[e]],
        //         backgroundColor: colors[i],
        //         borderColors: borderColors[i],
        //         borderWidth: 1
        //     }))
        // };

        return {
            labels: Object.keys(data),
            datasets: [
                {
                    label: Object.keys(data),
                    data: Object.values(data),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseDataWorkModeChart(data) {
        if (!data || Object.keys(data).length === 0) return null;

        return {
            labels: Object.keys(data),
            datasets: [
                {
                    label: '# de Modalidad',
                    data: Object.values(data),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }


    parseChannelCommercializationChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "physical") {
                labels["Fisico"] = data[d];
            } else if (d === "online") {
                labels["Online"] = data[d];
            } else if (d === "both") {
                labels["Ambas"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: Object.keys(labels),
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseStudyTypedChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "bootcamp") {
                labels["Bootcamp"] = data[d];
            } else if (d === "technical") {
                labels["Tecnicos"] = data[d];
            } else if (d === "university") {
                labels["Universitarios"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: Object.keys(labels),
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseStudyFieldChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "gastronomy") {
                labels["Gatronomia"] = data[d];
            } else if (d === "other") {
                labels["Otro"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: Object.keys(labels),
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }

    parseProfessionalIntentionChart(data) {
        if (!data || Object.keys(data).length === 0) return null;
        const labels = {}
        for (let d in data) {
            if (d === "yes") {
                labels["Si"] = data[d];
            } else if (d === "no") {
                labels["No"] = data[d];
            }
        }

        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: Object.keys(labels),
                    data: Object.values(labels),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }
}


export default new EmployerReportController();
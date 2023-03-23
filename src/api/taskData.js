import AdmitPrisoner from "../wardenDashboard/AdmitPrisoner";
import PrisonerCaseReveal from "../wardenDashboard/PrisonerCaseReveal";
import PrisonerEducationSchedular from "../wardenDashboard/PrisonerEducationSchedular";
import PrisonerHealthRecord from "../wardenDashboard/PrisonerHealthRecord";
import PrisonerTaskSchedular from "../wardenDashboard/PrisonerTaskSchedular";
import PrisonerVisitorRecord from "../wardenDashboard/PrisonerVisitorRecord";
import RecordTransfers from "../wardenDashboard/RecordTransfers";


const taskList = [
    {
        id: "admitPrisoner",
        taskName: "admit prisoner",
        taskDescription: "simple description",
        component: <AdmitPrisoner />

    },
    {
        id: "RecordTransfers",
        taskName: "transfer record",
        taskDescription: "simple description",
        component: <RecordTransfers />
    },
    {
        id: "PrisonerTaskSchedular",
        taskName: "Prisoners schedules",
        taskDescription: "You are obligation is to schedule prisoner to ensure perfect flow of duties",
        component: <PrisonerTaskSchedular />
    },
    {
        id: "PrisonerHealthREcord",
        taskName: "health care",
        taskDescription: "select prisoner that your intend to update or request health issue",
        component: <PrisonerHealthRecord />
    },
    {
        id: "PrisonerCaseReveal",
        taskName: "case reveal",
        taskDescription: "case reveal appointments",
        component: <PrisonerCaseReveal />
    },
    {
        id: "PrisonerVisitorRecord",
        taskName: "visitors records",
        taskDescription: "visitor record",
        component: <PrisonerVisitorRecord />
    },
    {
        id: "PrisonerEducationSchedular",
        taskName: "education schedules",
        taskDescription: "make arragement on prisoner course training schedule",
        component: <PrisonerEducationSchedular />
    }
]



export default taskList;
import PrisonerCaseReveal from "../wardenDashboard/PrisonerCaseReveal";
import PrisonerEducationSchedular from "../wardenDashboard/PrisonerEducationSchedular";
import PrisonerHealthRecord from "../wardenDashboard/PrisonerHealthRecord";
import PrisonerTaskSchedular from "../wardenDashboard/PrisonerTaskSchedular";
import PrisonerVisitorRecord from "../wardenDashboard/PrisonerVisitorRecord";
import RegisterPrisoners from '../wardenDashboard/RegisterPrisoners';


const taskList = [
    {
        id: "admitPrisoner",
        taskName: "register prisoner",
        taskDescription: "simple description",
        component: <RegisterPrisoners />

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
        taskName: "case appeal",
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
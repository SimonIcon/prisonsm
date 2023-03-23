import ClearUser from "../adminDashboard/ClearUser";
import CreateSchedule from "../adminDashboard/CreateSchedule";
import Users from "../adminDashboard/Users";
import VerifyUsers from "../adminDashboard/VerifyUsers";


const items = [

    {
        id: "userData",
        label: 'verified users',
        component: <Users />,
        description: "verified wardens"

    },
    {
        id: "verifyUser",
        label: 'pending verification',
        component: <VerifyUsers />,
        description: "unverified wardens"

    },


]
export default items
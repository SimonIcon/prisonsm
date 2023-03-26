import Prisoners from "../adminDashboard/Prisoners";
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
    {
        id: "prisoners",
        label: "prisoners",
        component: <Prisoners />,
        description: "prisoner information"

    }


]
export default items
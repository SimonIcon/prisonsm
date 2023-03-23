import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Home from '../wardenDashboard/Home';
import ContactUs from '../wardenDashboard/ContactUs';
import AboutUs from '../wardenDashboard/AboutUs';


const info = [
    {
        id: "home",
        ItemName: "home",
        component: <Home />,
        icon: <HomeOutlinedIcon />
    },


    {
        id: "contactUs",
        ItemName: "contact us",
        component: <ContactUs />,
        icon: <CallOutlinedIcon />
    },
    {
        id: "aboutUs",
        ItemName: "about us",
        component: <AboutUs />,
        icon: <InfoOutlinedIcon />

    }
]
export default info
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SiGoogleadsense } from "react-icons/si";
import { IoHome } from "react-icons/io5";                               // property,property-listing
import { FaListUl, FaMapMarkerAlt } from "react-icons/fa";                        // listing-map
import { MdDashboard, MdFeaturedVideo, MdTypeSpecimen } from "react-icons/md";
import { FaHeart, FaRegUser } from "react-icons/fa6";                            // User
import { FaUserPen } from "react-icons/fa6";                            // Roles
import { IoIosDocument } from "react-icons/io";                         // AMC
import { MdWifiCalling3 } from "react-icons/md";                        // On Call Services
import { FaTasks } from "react-icons/fa";                               // Tasks
import { TbReportSearch } from "react-icons/tb";                        // Reports
import { IoIosSettings } from "react-icons/io";                         // settings
import { IoDocumentTextSharp } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { VscSourceControl } from "react-icons/vsc";             // work order
import { FaFolderTree } from "react-icons/fa6";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdTask } from "react-icons/md";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import "./Accordian.css"
import { useEffect } from 'react';
import { SideBarContext } from '../../context/SideBarContext';
import { MdAddHomeWork } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaMicrochip } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { getNavigationByRole } from '../../data';

import { HiMiniQuestionMarkCircle } from "react-icons/hi2";



const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    background: 'transparent'
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    alignItems: 'center',

    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),

    }

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
}));

export default function CustomizedAccordions({ nav }) {
    const { showSideBar } = React.useContext(SideBarContext)
    const { pathname } = useLocation();
    const { summary, isDropdown, details, type, path, id } = nav

    const openClosedAccordian = [
        "User Management",
        "Employee",
        "Leads Management",
        "Website Management",
        "Messages System",
        "Offers",
        "Email Campaigns",
        "User Logs",
        "Property Calculators",
        "Skip Tracing",
        "Vendor Services",
        "FAQ"
    ]
    const [expanded, setExpanded] = React.useState(['panel1', 'panel2']);

    const handleChange = (panel, summary) => (event, newExpanded) => {

        if (openClosedAccordian.includes(summary)) {    // for open and close accordian) {
            setExpanded(newExpanded ? [panel] : false);
        }


    };

    const mainIconMap = {
        "Property Management": <IoHome size={19} className='me-3' />,
        "User Management": <FaRegUser size={19} className='me-3' />,
        "Leads Management": <IoIosDocument size={19} className='me-3' />,
        "Website Management": <FaTasks size={19} className='me-3' />,
        "Messages System": <MdOutlineSpeakerNotes size={19} className='me-3' />,
        "Offers": <TbReportSearch size={19} className='me-3' />,
        "Vendor Services": <IoIosSettings size={19} className='me-3' />,
        "Email Campaigns": <IoDocumentTextSharp size={19} className='me-3' />,
        "FAQ": <HiMiniQuestionMarkCircle size={19} className='me-3' />,
    };

    const subNavIconMap = {
        "Listing Map": <FaMapMarkerAlt size={17} className='me-3' />,
        "Property Listing": <FaListUl size={17} className='me-3' />,
        "Insights By AI": <FaMicrochip size={17} className='me-3' />,
        "Favourites": <FaHeart size={17} className='me-3' />,
        "Vendor Services": <MdOutlineMiscellaneousServices size={17} className='me-3' />,
        "Property Types": <MdTypeSpecimen size={17} className='me-3' />,
        "Property Features": <MdFeaturedVideo size={17} className='me-3' />,
        "Property Statuses": <GrStatusGood size={17} className='me-3' />,
        "Leads": <GrStatusGood size={17} className='me-3' />,
        "Lead Sources": <VscSourceControl size={17} className='me-3' />,
        "Lead Types": <FaFolderTree size={17} className='me-3' />,
        "Packages": <MdTask size={17} className='me-3' />,
        "Package Features": <MdFeaturedPlayList size={17} className='me-3' />,
        "Chats": <IoChatbubbleEllipses size={17} className='me-3' />,
        "Website Offers": <MdAddHomeWork size={19} className='me-3' />,
        "All Emails": <MdMarkEmailUnread size={19} className='me-3' />,
        "Dashboard": <MdDashboard size={17} className='me-3' />,
        "Users": <FaRegUser size={17} className='me-3' />,
        "User Logs": <FaRegUser size={17} className='me-3' />,
        "ARV Calculator": <FaCalculator size={17} className='me-3' />,
        "ROI Calculator": <FaCalculator size={17} className='me-3' />,
        "Skip Tracing": <FaCalculator size={17} className='me-3' />,
        "Roles": <FaUserPen size={17} className='me-3' />,
        "FAQ": <HiMiniQuestionMarkCircle size={17} className='me-3' />,
    };






    return (

        <Accordion expanded={expanded && expanded.includes(`panel${id}`)} onChange={handleChange(`panel${id}`, summary)} >
            <AccordionSummary aria-controls={`panel${id}d-content`} id={`panel${id}d-header`} className={`d-flex align-items-center bg-light-gray ${pathname == path ? 'active' : ""}`} >
                {
                    mainIconMap[summary]
                }
                {
                    type === "Route" ? (
                        <Link to={path} onClick={() => { showSideBar(false) }}>
                            <Typography>{summary}</Typography>
                        </Link>
                    ) : <Typography>{summary}</Typography>
                }
            </AccordionSummary>
            {
                isDropdown && (
                    details.map((subNav, index) => (
                        <AccordionDetails key={index} sx={{
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}>
                            <>

                                <AccordionSummary className={pathname == subNav.path ? 'active' : ""} >
                                    {
                                        subNavIconMap[subNav.summary]
                                    }
                                    {
                                        subNav.type === "Route" ? (
                                            <Link to={subNav.path} onClick={() => { showSideBar(false) }}>
                                                <Typography sx={{ fontSize: 14 }}>{subNav.summary}</Typography>
                                            </Link>
                                        ) : <Typography >{subNav.summary}</Typography>
                                    }
                                </AccordionSummary>
                            </>
                        </AccordionDetails>
                    ))
                )
            }

        </Accordion>



    );
}

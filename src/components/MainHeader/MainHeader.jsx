import { useContext } from 'react';
import Notification from '../Notification/Notification'
import { GiHamburgerMenu } from "react-icons/gi";
import { SideBarContext } from '../../context/SideBarContext';

const MainHeader = () => {
    const { showSideBar } = useContext(SideBarContext)
    const {role} = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <div
                className='section-main-heading d-flex align-items-center justify-content-between pt-3 px-4'
                >
                <h2 className='main-dashboard-heading'>{`${role[0].toLocaleUpperCase()}${role?.substring(1)}`} Dashboard</h2>
                <div className="menu-bar ps-3 d-xl-none d-block" onClick={() => { showSideBar(true) }}>
                    <span><GiHamburgerMenu size={23} /></span>
                </div>
                <Notification />
            </div>
        </>
    )
}

export default MainHeader
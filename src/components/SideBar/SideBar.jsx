import React, { useContext } from 'react'
import CompanyLogo from "../../assets/img/logo.png"
import "./SideBar.css"
import AccordiansComp from '../MUI/AccordiansComp'
import { getNavigationByRole } from '../../data'
import { SideBarContext } from '../../context/SideBarContext'
import { ImCross } from "react-icons/im";
import LOGO from "../../assets/img/new-logo.png"

const SideBar = () => {
    const { isShowOnMob, showSideBar } = useContext(SideBarContext)
    return (
        <>
            <div className={`${isShowOnMob ? 'open-bar' : ""} side-bar-wrapper header bg-grey-clr`}>
                <div className="close-side-bar-btn d-xl-none d-block my-3 d-flex justify-content-end pe-3">
                    <span onClick={() => { showSideBar(false) }}>
                        <ImCross size={28} className='cross-img' />
                    </span>
                </div>
                <div className="logo-header d-flex align-items-center gap-3 justify-content-center pt-2">
                    <div>
                        <img src={LOGO} alt="logo" />
                    </div>
                    <div className='d-flex flex-column gap-1'>
                        <span className='fw-bolder company-name'>Realty Vision</span>
                        <span className='fw-bolder company-name'>Capital Group</span>
                    </div>
                </div>
                <div className="side-navigation mt-4">
                    {
                        getNavigationByRole().map((nav, index) => {
                            console.log(nav)
                            return (
                                <AccordiansComp
                                    key={index}
                                    nav={nav}

                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SideBar
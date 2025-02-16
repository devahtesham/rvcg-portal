import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";

import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const ComplaintSummary = () => {
    return (
        <div className="main-card dashboard-card p-2">
            <div className="px-2 daily-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='m-0'>Daily Complaint Summary </h4>
                <button className='btn'>
                    <LuArrowUpRight size={20} />
                </button>
            </div>
            <div className="daly-complaints mt-4">
                {/* PROGRESS */}
                <div className="daily-complain d-flex align-items-center w-100 gap-2 px-3">
                    <div className="message-icon bg-green-clr p-2 rounded-3">
                        <span>
                            <AiOutlineMessage size={32} color='#fff' />
                        </span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <div>
                            <div className='d-flex align-items-center gap-2 mb-1'>
                                <span className='m-0 daily-comp-heading '>Adam Carry</span>
                                <span className='daily-comp-sub-heading fst-italic'>November 21, 2023</span>
                            </div>

                            <div className='d-flex align-items-center gap-1'>
                                <FaUserCircle size={18} />
                                <span className='daily-comp-heading-user d-block'>Adam William</span>
                            </div>

                        </div>
                        <div className="status">
                            <h5 className='m-0 progress-complain'>PROGRESS</h5>
                        </div>
                    </div>

                </div>
                {/* CLOSED */}
                <div className="daily-complain d-flex align-items-center w-100 gap-2 px-3 mt-4">
                    <div className="message-icon bg-green-clr p-2 rounded-3">
                        <span>
                            <AiOutlineMessage size={32} color='#fff' />
                        </span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <div>
                            <div className='d-flex align-items-center gap-2 mb-1'>
                                <span className='m-0 daily-comp-heading '>Adam Carry</span>
                                <span className='daily-comp-sub-heading fst-italic'>November 21, 2023</span>
                            </div>

                            <div className='d-flex align-items-center gap-1'>
                                <FaUserCircle size={18} />
                                <span className='daily-comp-heading-user d-block'>Adam William</span>
                            </div>

                        </div>
                        <div className="status">
                            <h5 className='m-0 closed-complain'>CLOSED</h5>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ComplaintSummary
import React from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import PieChartComp from '../MUI/PieChart/PieChartComp'

const ClosingAmcServices = () => {
    return (
        <div className="main-card dashboard-card p-2">
            <div className="px-2 closing-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='m-0'>Closing AMC Services</h4>
                <button className='btn'>
                    <LuArrowUpRight size={20} />
                </button>
            </div>
            <PieChartComp data={[
                { value: 10, label: '57% open service', color: "#ff9054" },
                { value: 10, label: '21% close service', color: "#3DC681" },
            ]} />
        </div>
    )
}

export default ClosingAmcServices
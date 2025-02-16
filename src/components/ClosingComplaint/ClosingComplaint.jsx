
import PieChartComp from '../MUI/PieChart/PieChartComp'
import { LuArrowUpRight } from 'react-icons/lu'

const ClosingComplaint = () => {
    return (
        <div className="main-card dashboard-card p-2">
            <div className="px-2 closing-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='m-0'>Closing Complaint</h4>
                <button className='btn'>
                    <LuArrowUpRight size={20} />
                </button>
            </div>
            <PieChartComp data={[
                { value: 10, label: '43% open complaint', color: "#ff9054" },
                { value: 10, label: '36% close complaint', color: "#3DC681" },
            ]} />
        </div>
    )
}

export default ClosingComplaint
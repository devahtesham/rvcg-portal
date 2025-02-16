
const SmartSummary = () => {
    return (
        <div className="main-card dashboard-card p-2">
            <div className="px-2 daily-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='m-0'>Smart Summary </h4>
            </div>
            {/* OPEN */}
            <div className="smart-summary-complaints mt-4 px-3">
                <div className="summary-complaint d-flex align-items-center gap-3">
                    <h2 className='smart-complain smart-complain-open m-0'>6</h2>
                    <span>Open Complaint</span>
                </div>
                {/* PROGRESS */}
                <div className="summary-complaint d-flex align-items-center gap-3 mt-4">
                    <h2 className='smart-complain smart-complain-progress m-0'>3</h2>
                    <span>Progress Complaint</span>
                </div>

                {/* CLOSED COMPLAIN */}
                <div className="summary-complaint d-flex align-items-center gap-3 mt-4">
                    <h2 className='smart-complain smart-complain-closed m-0'>3</h2>
                    <span>Closed Complaint</span>
                </div>

                <div className="summary-complaint d-flex align-items-center gap-3 mt-4">
                    <h2 className='smart-complain smart-complain-open-service m-0'>3</h2>
                    <span>Open Service</span>
                </div>

                <div className="summary-complaint d-flex align-items-center gap-3 mt-4">
                    <h2 className='smart-complain smart-complain-progress-service m-0'>3</h2>
                    <span>Progress Service</span>
                </div>

                <div className="summary-complaint d-flex align-items-center gap-3 mt-4">
                    <h2 className='smart-complain smart-complain-closed-service m-0'>3</h2>
                    <span>Closed Service</span>
                </div>
            </div>
        </div>
    )
}

export default SmartSummary
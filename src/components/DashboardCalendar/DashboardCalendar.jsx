import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useModal } from '../../hooks/useModal'

const DashboardCalendar = () => {
    const { isSmallDevices, isMobileDevice } = useModal();
    useEffect(() => {
        isMobileDevice(800)
    }, [])
    return (
        <div className="main-card dashboard-card p-2">
            <div className="px-2 closing-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='my-2'>Calendar</h4>
            </div>
            <FullCalendar
                height={290}
                contentHeight={600}
                handleWindowResize={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={
                    isSmallDevices ? {} :
                        {
                            left: 'prev,today,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }
                }
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // select={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
        </div>
    )
}

export default DashboardCalendar
import React, { useContext, useState } from 'react'
import { BsBellFill } from "react-icons/bs"
import { PropertyContext } from '../../context/PropertyContext'
import UserLogin from '../UserLoggedIn/UserLogin'

const Notification = () => {
    let [isShowNotifications, setIsShowNotifications] = useState(false)
    const { allNotifications, setAllNotifications } = useContext(PropertyContext)

    // for notifications
    const clearAllNotificationsHandler = () => {
        setAllNotifications([])
        setIsShowNotifications(false)
    }

    return (
        <div className='d-flex align-items-center gap-5'>
            <div className='notification-bell- cursor-pointer'>
                <BsBellFill color='#000' fontSize={20} onClick={() => setIsShowNotifications(!isShowNotifications)} />
                <div className='notifications-container'>
                    <div className={`notifications py-3 px-2 ${isShowNotifications ? " " : "hide-notifications"}`}>
                        <div className='notification-inner'>
                            {
                                allNotifications.length < 1 ? <h2 className='mt-5 text-center text-white'>Empty !</h2> : (
                                    allNotifications.map((notification, index) => (
                                        <div key={index} className=' mb-3 notification px-2 read'>
                                            <h6>{notification.Title}: </h6>
                                            <p className='mb-0'>{notification.Body}</p>
                                            <div className='text-end'>
                                                <h6 className='mt-2 mb-0 fw-700 fs-14'>{new Date(notification.CreatedAt).toLocaleString()}</h6>
                                            </div>
                                        </div>
                                    ))
                                )
                            }

                        </div>
                        <div className='notification-footer'>
                            <span className='modal-more-detail-text me-2' onClick={clearAllNotificationsHandler}>Clear All</span>
                        </div>
                    </div>

                </div>
            </div>
            <UserLogin />
        </div>

    )
}

export default Notification


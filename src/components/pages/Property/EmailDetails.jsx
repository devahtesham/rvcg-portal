import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { successNotify } from '../../../Toastify/Toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProperties, GetEmailById, GetLeadsById, GetPropertyById } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import MapLoader from '../../Loader/MapLoader'
import { displayTime, formatDateForUI, LEAD_STATUS_ENUM } from '../../../data/global'
import { useModal } from '../../../hooks/useModal'
import { FaPlus } from 'react-icons/fa6'
import ModalGlobal from '../../MUI/Modal/ModalGlobal'
import AddPropertyType from './AddPropertyType'
import ContactLeadForm from './ContactLeadForm'


const EmailDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const { handleModalOpen } = useModal()

    const { isLoading, emailView } = useSelector((state) => state.PropertyMangementReducer)

    console.log('[leadDetails]', emailView)

    useEffect(() => {
        dispatch(GetEmailById(id))
    }, [])


    return (
        <>
            <div className='display-detail-sec main-section position-relative'>
                {/* property image */}
                {
                    isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
                        <MapLoader />
                    </div> : (
                        <Container>
                            {/* property Details */}
                            <section className='property-details mt-5'>
                                <Row className='mb-4 mt-3'>
                                    <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2'>
                                        <h1 className='m-0 side-heading'>View Email:</h1>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='d-flex justify-content-end mt-3 mb-0 align-items-end'>
                                        <h6 className={'lead-status-closed'}>{emailView?.status?.toUpperCase()}</h6>
                                    </div>
                                </Row>
                            </section>
                            <section className='mt-3'>
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <h6>{formatDateForUI(emailView?.created_at)}</h6>
                                    <h6>{displayTime(emailView?.created_at)}</h6>
                                </div>
                                <div className='d-flex align-items-center gap-3 mb-5'>
                                    <h5 className='m-0 user-name-email'>{emailView?.user?.name?.toUpperCase()}</h5><span>{emailView?.user?.email}</span>
                                </div>
                                <h3 >{emailView?.subject ? emailView?.subject : "No Subject"}</h3>
                                <p className='mt-3'>
                                    {emailView?.message}
                                </p>
                            </section>
                        </Container>
                    )
                }

            </div >
            <ModalGlobal>
                <ContactLeadForm />
            </ModalGlobal>
        </>
    )
}

export default EmailDetails
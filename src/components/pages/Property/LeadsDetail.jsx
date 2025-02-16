import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { successNotify } from '../../../Toastify/Toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProperties, GetLeadsById, GetPropertyById } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import MapLoader from '../../Loader/MapLoader'
import { formatDateForUI, LEAD_STATUS_ENUM } from '../../../data/global'
import { useModal } from '../../../hooks/useModal'
import { FaPlus } from 'react-icons/fa6'
import ModalGlobal from '../../MUI/Modal/ModalGlobal'
import AddPropertyType from './AddPropertyType'
import ContactLeadForm from './ContactLeadForm'


const LeadsDetail = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const { handleModalOpen } = useModal()

    const { isLoading, leadDetails } = useSelector((state) => state.PropertyMangementReducer)

    console.log('[leadDetails]', leadDetails)

    useEffect(() => {
        dispatch(GetLeadsById(id))
    }, [])

    let leadStatusCssClass;
    switch (leadDetails?.status) {
        case 'open':
            leadStatusCssClass = "lead-status-open"
            break;

        case 'in_progress':

            leadStatusCssClass = "lead-status-inprogress"
            break;

        case 'closed':
            leadStatusCssClass = "lead-status-closed"
            break;
        case 'rejected':
            leadStatusCssClass = "lead-status-rejected"
            break;
        default:
            leadStatusCssClass = "lead-status-open"
            break;
    }


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
                                        <h1 className='m-0 side-heading'>Leads Details:</h1>
                                        <Button onClick={handleModalOpen} className='fw-600 bg-yellow-clr border-0 text-dark' >CONTACT LEAD</Button>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='d-flex justify-content-end mt-3 mb-0 align-items-end'>
                                        <h6 className={leadStatusCssClass}>{LEAD_STATUS_ENUM[leadDetails?.status]?.toUpperCase()}</h6>
                                    </div>
                                </Row>
                                <Container fluid>
                                    <Row className='align-items-center'>
                                        {/* Property Detail */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-2 '>
                                                <h6 className='mb-3 mt-2 me-2'>First Name: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.first_name}</p>
                                            </div>
                                        </Col>






                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='door-no d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Last Name: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.last_name}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='door-no d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Email: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.email}</p>
                                            </div>
                                        </Col>



                                        {/* Number of Bathrooms */}

                                        {/* Swimming Pool */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Lead Type:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.lead_type?.type_name}</p>
                                            </div>
                                        </Col>





                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Source:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.lead_source?.title}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Position:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.position}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Website:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.website}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Phone:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.phone}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Lead Value:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.lead_value}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Company:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.company}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>City:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.city}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>State:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.state}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Country:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.country}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Zip Code:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.zip_code}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Default Language:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.default_language}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Contacted Today:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.contacted_today == true ? "YES" : 'NO'}</p>
                                            </div>
                                        </Col>




                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Lead Date:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(leadDetails?.created_at)}</p>
                                            </div>
                                        </Col>




                                        <Col xl={12} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Special Notes:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.special_notes}</p>
                                            </div>
                                        </Col>




                                        <Col xl={12} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Description:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.description}</p>
                                            </div>
                                        </Col>




                                        <Col xl={12} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Address:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.address}</p>
                                            </div>
                                        </Col>



                                    </Row>
                                    <Row className='align-items-center mt-5'>
                                        <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                            <h1 className='m-0 side-heading'>Added By Details:</h1>
                                        </div>
                                        {/* Property Detail */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-2 '>
                                                <h6 className='mb-3 mt-2 me-2'>Name: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.added_by?.name}</p>
                                            </div>
                                        </Col>



                                        {/* Number Of Bedrooms */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='door-no d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Email: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.added_by?.email}</p>
                                            </div>
                                        </Col>




                                        {/* Number of Bathrooms */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-name d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Date:</h6>
                                                {

                                                }
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(leadDetails?.added_by?.created_at)}</p>
                                            </div>
                                        </Col>






                                        {/* Swimming Pool */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Role:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.added_by?.role}</p>
                                            </div>
                                        </Col>





                                        {/* <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Phone</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.added_by?.phone_number}</p>
                                            </div>
                                        </Col> */}


                                    </Row>
                                    <Row className='align-items-center mt-5'>
                                        <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                            <h1 className='m-0 side-heading'>Assigned To Details:</h1>
                                        </div>
                                        {/* Property Detail */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-2 '>
                                                <h6 className='mb-3 mt-2 me-2'>Name: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.assigned_to?.name}</p>
                                            </div>
                                        </Col>



                                        {/* Number Of Bedrooms */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='door-no d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Email: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.assigned_to?.email}</p>
                                            </div>
                                        </Col>




                                        {/* Number of Bathrooms */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-name d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Date:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(leadDetails?.assigned_to?.created_at)}</p>
                                            </div>
                                        </Col>






                                        {/* Swimming Pool */}


                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Role:</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.assigned_to?.role}</p>
                                            </div>
                                        </Col>





                                        {/* <Col xl={3} lg={4} className='b-4 rounded-2 m-2'>
                                            <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                <h6 className='mb-3 mt-2 me-2'>Phone</h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{leadDetails?.assigned_to?.phone_number}</p>
                                            </div>
                                        </Col> */}


                                    </Row>
                                    {
                                        leadDetails?.tags?.length ? (
                                            <Row className='align-items-center mt-5'>
                                                <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                                    <h1 className='m-0 side-heading'>Tags:</h1>
                                                </div>
                                                {/* Property Detail */}
                                                <div className='rs-ref-no d-flex gap-4 my-2 '>
                                                    {
                                                        leadDetails?.tags.map((tag, index) => (
                                                            <h6 key={index} className='tag'>{tag}</h6>
                                                        ))
                                                    }

                                                </div>
                                            </Row>
                                        ) : null
                                    }

                                    {
                                        leadDetails?.lead_histories?.length ? (
                                            <Row className='align-items-center mt-5'>
                                                <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                                    <h1 className='m-0 side-heading'>Lead History:</h1>
                                                </div>
                                                {/* Property Detail */}

                                                {
                                                    leadDetails?.lead_histories.map((history, index) => (
                                                        <Row key={index} className='mb-2'>
                                                            <Col lg={8}>
                                                                <div className='lead-history-card bg-lightgray mt-4 rounded-3 p-4 shadow-sm'>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Lead Name</h6>
                                                                        <p>{leadDetails?.first_name} {leadDetails?.last_name}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Contact Date</h6>
                                                                        <p>{history.contact_date}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Note</h6>
                                                                        <p>{history.note}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Followup Date</h6>
                                                                        <p>{history.follow_up_date}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Status</h6>
                                                                        <p>{history.status}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    ))
                                                }

                                            </Row>
                                        ) : null
                                    }
                                </Container>
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

export default LeadsDetail
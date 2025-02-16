import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { successNotify } from '../../../Toastify/Toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProperties, GetLeadsById, GetOfferById, GetOfferHistory, GetPropertyById } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import MapLoader from '../../Loader/MapLoader'
import { formatDateForUI, LEAD_STATUS_ENUM } from '../../../data/global'
import { useModal } from '../../../hooks/useModal'
import { FaPlus } from 'react-icons/fa6'
import ModalGlobal from '../../MUI/Modal/ModalGlobal'
import AddPropertyType from './AddPropertyType'
import ContactLeadForm from './ContactLeadForm'


const OfferDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { isLoading, offerDetails, offerHistory } = useSelector((state) => state.PropertyMangementReducer)

    useEffect(() => {
        dispatch(GetOfferById(id))
        dispatch(GetOfferHistory(id))
    }, [])

    console.log('[offerDetails]', offerDetails)
    console.log('[offerHistory]', offerHistory)

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
                                        <h1 className='m-0 side-heading'>Offer Details:</h1>
                                    </div>
                                </Row>
                                <Container fluid>
                                    <Row className='align-items-center'>
                                        {/* Property Detail */}


                                        {
                                            offerDetails?.listing?.title && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-2 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Title: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.listing?.title}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }





                                        {
                                            offerDetails?.user?.name && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>User Name: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.user?.name}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }



                                        {
                                            offerDetails?.offer_price && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>Offer Price: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.offer_price}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }



                                        {/* Number of Bathrooms */}

                                        {/* Swimming Pool */}


                                        {
                                            offerDetails?.offer_date && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Offer Date:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(offerDetails?.offer_date)}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }




                                        {
                                            offerDetails?.expiry_date && (

                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Expiry Date:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(offerDetails?.expiry_date)}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            offerDetails?.status && (

                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Status:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.status}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }




                                        {
                                            offerDetails?.payment_method && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Payment Method:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.payment_method}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }



                                        {
                                            offerDetails?.accepted_price && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Accepted Price:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.accepted_price}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }





                                        {
                                            offerDetails?.closing_date && (

                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Closing Date:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(offerDetails?.closing_date)}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            offerDetails?.message && (
                                                <Col xl={12} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Message:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.message}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }




                                        {
                                            offerDetails?.negotiation_comments && (

                                                <Col xl={12} lg={4} className='rounded-2'>
                                                    <div className='tenant-whatsapp d-flex flex-column my-3'>
                                                        <h6 className='mb-3 mt-2 me-2'>Negotiation Comments:</h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{offerDetails?.negotiation_comments}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                    {
                                        offerHistory?.length ? (
                                            <Row className='align-items-center mt-5'>
                                                <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                                    <h1 className='m-0 side-heading'>Offer History:</h1>
                                                </div>
                                                {/* Property Detail */}

                                                {
                                                    offerHistory.map((history, index) => (
                                                        <Row key={index} className='mb-2'>
                                                            <Col lg={8}>
                                                                <div className='lead-history-card bg-lightgray mt-4 rounded-3 p-4 shadow-sm'>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Name</h6>
                                                                        <p>{history?.listing_owner?.name}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Contact Date</h6>
                                                                        <p>{history?.listing_owner?.email}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Negotiation Comments</h6>
                                                                        <p>{history?.negotiation_comments}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Negotiation Date</h6>
                                                                        <p>{formatDateForUI(history.negotiation_date)}</p>
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
        </>
    )
}

export default OfferDetails
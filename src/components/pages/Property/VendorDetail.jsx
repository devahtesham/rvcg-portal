import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { successNotify } from '../../../Toastify/Toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProperties, GetLeadsById, GetPropertyById, GetVendorById } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import MapLoader from '../../Loader/MapLoader'
import { formatDateForUI, LEAD_STATUS_ENUM } from '../../../data/global'
import { useModal } from '../../../hooks/useModal'
import { FaPlus } from 'react-icons/fa6'
import ModalGlobal from '../../MUI/Modal/ModalGlobal'
import AddPropertyType from './AddPropertyType'
import ContactLeadForm from './ContactLeadForm'


const VendorDetail = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const { handleModalOpen } = useModal()

    const { isLoading, vendorDetails } = useSelector((state) => state.PropertyMangementReducer)

    console.log('[vendorDetails]', vendorDetails)

    useEffect(() => {
        dispatch(GetVendorById(id))
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
                                        <h1 className='m-0 side-heading'>Vendor Details:</h1>
                                    </div>
                                </Row>
                                <Container fluid>
                                    <Row className='align-items-center'>
                                        {/* Property Detail */}

                                        {
                                            vendorDetails?.user?.name !== null && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-2 '>
                                                        <h6 className='mb-3 mt-2 me-2'>User Name: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.user?.name}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }


                                        {
                                            vendorDetails?.user?.email !== null && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>Email: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.user?.email}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }


                                        {
                                            vendorDetails?.address !== null && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>Address: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.address}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }

                                        {
                                            vendorDetails?.city !== null && (
                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>City: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.city}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }

                                        {
                                            vendorDetails?.state !== null && (

                                                <Col xl={4} lg={4} className='rounded-2'>
                                                    <div className='door-no d-flex flex-column my-2'>
                                                        <h6 className='mb-3 mt-2 me-2'>State: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.state}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {vendorDetails?.zip_code !== null && (
                                        <Col xl={4} lg={4} className='rounded-2'>
                                            <div className='door-no d-flex flex-column my-2'>
                                                <h6 className='mb-3 mt-2 me-2'>Zip Code: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{vendorDetails?.zip_code}</p>
                                            </div>
                                        </Col>

                                        )}
                                    </Row>

                                    {
                                        vendorDetails?.services?.length ? (
                                            <Row className='align-items-center mt-5'>
                                                <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2 mb-4'>
                                                    <h1 className='m-0 side-heading'>Services Offered:</h1>
                                                </div>
                                                {/* Property Detail */}

                                                {
                                                    vendorDetails?.services.map((service, index) => (
                                                        <Row key={index} className='mb-2'>
                                                            <Col lg={8}>
                                                                <div className='lead-history-card bg-lightgray mt-4 rounded-3 p-4 shadow-sm'>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Service Name</h6>
                                                                        <p>{service?.service_name}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Price</h6>
                                                                        <p>{service?.price}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>City</h6>
                                                                        <p>{service?.service_city}</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <h6 className='fw-700'>Description</h6>
                                                                        <p>{service?.description}</p>
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

export default VendorDetail
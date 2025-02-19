import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import { useDispatch, useSelector } from 'react-redux'
import { AddToFav, GetAllProperties, GetPropertyById, GetPropertyKPI } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { formatDateForUI } from '../../../data/global'
import KPIChart from './KPI/KPIChart'
import { FaHeart } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import MapLoader from '../../Loader/MapLoader'





const DisplayDetails = () => {
    const booleanTypes = [0, 1, 'true', 'false', true, false]
    const { role } = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const { isLoading, propertyDetails } = useSelector((state) => state.PropertyMangementReducer)

    useEffect(() => {
        dispatch(GetPropertyById(id))
    }, [dispatch, id])



    const savePropertyHandler = () => {
        const payload = {
            listing_id: id,
            is_favourite: 1
        }

        dispatch(AddToFav(payload))
            .then((response) => {
                console.log('[response]', response)
                if (response.meta.requestStatus === "fulfilled") {
                    successNotify("Added to Favourites !")
                } else {
                    errorNotify(response.payload)

                }
            })
            .catch((error) => {
                console.log(error)
                errorNotify(error)
            })


    }

    const applySkipTrace = () => {
        navigate(`/payments/${id}`)
    }

    return (
        isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
            <MapLoader />
        </div> : (
            <div className='display-detail-sec main-section'>
                {/* property image */}
                <section>
                    <div className='property-bg-img'>
                        <img src={PropertyBgImg} alt="" />
                    </div>
                </section>
                <Container>
                    {/* property Details */}
                    <section className='property-details mt-5'>
                        <Row className='mb-4 mt-3'>
                            <div className='d-flex justify-content-sm-between align-items-center flex-wrap justify-content-center gap-2'>
                                <h1 className='m-0 side-heading'>Property Details:</h1>
                                <div className='d-flex gap-3'>
                                    <button className='btn btn-outline-danger' onClick={savePropertyHandler}>
                                        <FaHeart size={25} />
                                    </button>
                                </div>

                            </div>
                        </Row>

                        <Row className='align-items-center'>
                            {/* Property Detail */}
                            {
                                propertyDetails?.title !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='rs-ref-no d-flex flex-column my-3 '>
                                            <h6 className='mb-3 mt-2 me-2'>Title: </h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails.title}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {/* Number Of Bedrooms */}
                            {
                                propertyDetails?.city?.city_name !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='door-no d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>City: </h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.city?.city_name}</p>
                                        </div>
                                    </Col>
                                )
                            }


                            {/* Number of Bathrooms */}
                            {
                                propertyDetails?.country?.country_name !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-name d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Country:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.country?.country_name}</p>
                                        </div>
                                    </Col>

                                )
                            }



                            {/* Swimming Pool */}
                            {
                                propertyDetails?.listing_date !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-whatsapp d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Listing Date:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{formatDateForUI(propertyDetails?.listing_date)}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {/* Community */}
                            {
                                propertyDetails?.price !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-name d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Price:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.price}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {/* Master Project  */}
                            {
                                propertyDetails?.square_foot !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Square Foot:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.square_foot}</p>
                                        </div>
                                    </Col>

                                )
                            }

                            {/* latitude */}


                            {/* longitude */}
                            {
                                propertyDetails?.year_built !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Year Built:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.year_built}</p>
                                        </div>
                                    </Col>

                                )
                            }

                            {/* location */}
                            {
                                propertyDetails?.lot_size !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Lot Size:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.lot_size}</p>
                                        </div>
                                    </Col>

                                )
                            }

                            {/* Description */}

                            {/* Description */}





                            {/* Description */}
                            {
                                propertyDetails?.roi !== null && (
                                    <>
                                        <Col xl={4} lg={4} className=''>
                                            <div className='owner-mobile my-3 mb-2 rounded-2'>
                                                <h6 className='mb-2'>ROI:</h6>
                                                <p className={`m-0 b-4 p-3 py-2 rounded-2 fw-700 ${propertyDetails?.roi < 0 ? 'text-danger' : 'text-success'}`}>{propertyDetails?.roi?.toFixed(2)} %</p>
                                            </div>
                                            {
                                                propertyDetails?.roi < 0 && (
                                                    <span className='ms-3 text-danger fw-700'>This investment would result in a {String(propertyDetails?.roi?.toFixed(2)).substring(1)} % loss</span>
                                                )
                                            }

                                            {
                                                propertyDetails?.roi > 15 && (
                                                    <span className='ms-3 text-success fw-700'>Excellent return, often in high-growth</span>
                                                )
                                            }
                                        </Col>
                                    </>
                                )
                            }

                            {/* Description */}

                            {
                                propertyDetails?.cap_rate !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Cape Rate:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.cap_rate}</p>

                                        </div>
                                    </Col>
                                )
                            }

                            {/* Description */}

                            {/* Description */}

                            {
                                propertyDetails?.address !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Address:</h6>
                                            <div className='detail-description'>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.address}</p>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }
                            {
                                propertyDetails?.zip_code !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Zip Code:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.zip_code}</p>

                                        </div>
                                    </Col>
                                )
                            }
                            {
                                propertyDetails?.gdrp_agreement !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>GDRP Agreement:</h6>
                                            <div className='detail-description'>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'></p>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }

                            {
                                propertyDetails?.bedrooms !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Bedrooms:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.bedrooms}</p>

                                        </div>
                                    </Col>
                                )
                            }
                            {
                                propertyDetails?.bathrooms !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Bathrooms:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.bathrooms}</p>

                                        </div>
                                    </Col>
                                )
                            }

                            {
                                propertyDetails?.arv !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>ARV:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>${propertyDetails?.arv?.toFixed(2)}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {
                                booleanTypes.includes(propertyDetails?.is_featured) && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Featured:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{(propertyDetails?.is_featured === 1 || propertyDetails?.is_featured === true) ? "Yes" : "No"}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {/* Number Of AC */}
                            {
                                propertyDetails?.property_type?.title !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>Property Type:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.property_type?.title}</p>
                                        </div>
                                    </Col>

                                )
                            }
                            {
                                propertyDetails?.leadtypes?.type_name !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>Lead Type:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.leadtypes?.type_name}</p>
                                        </div>
                                    </Col>

                                )
                            }
                            {
                                propertyDetails?.moa !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>MOA (70%):</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>${propertyDetails?.moa?.toFixed(2)}</p>
                                        </div>
                                    </Col>

                                )
                            }
                            {
                                propertyDetails?.repair_cost !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>Repair Cost:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>${propertyDetails?.repair_cost}</p>
                                        </div>
                                    </Col>

                                )
                            }
                            {
                                propertyDetails?.wholesale_fee !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>Wholesale Fee:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>${propertyDetails?.wholesale_fee}</p>
                                        </div>
                                    </Col>

                                )
                            }
                            {
                                propertyDetails?.price_per_square_feet !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-mobile d-flex flex-column my-2'>
                                            <h6 className='mb-3 mt-2 me-2'>Price Per SqFt:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>${propertyDetails?.price_per_square_feet}</p>
                                        </div>
                                    </Col>

                                )
                            }

                            {/* Door No */}
                            {
                                propertyDetails?.description !== null && (
                                    <Col xl={12} lg={4} className=' rounded-2'>
                                        <div className='property-no d-flex my-3 flex-column'>
                                            <h6 className='mb-3 mt-2 me-2'>Description:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.description}</p>
                                        </div>
                                    </Col>

                                )
                            }


                            {/* Number of Water Heater */}
                            {
                                propertyDetails?.property_status?.status !== null && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='tenant-email d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Property Status:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.property_status?.status}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {
                                booleanTypes.includes(propertyDetails?.is_approved) && (
                                    <Col xl={4} lg={4} className=' rounded-2'>
                                        <div className='owner-mobile d-flex flex-column my-3'>
                                            <h6 className='mb-3 mt-2 me-2'>Approved:</h6>
                                            <p className='m-0 b-4 p-3 py-2 rounded-2'>{(propertyDetails?.is_approved === 1 || propertyDetails?.is_approved == true) ? "Yes" : "No"}</p>
                                        </div>
                                    </Col>
                                )
                            }

                            {
                                propertyDetails?.features?.length ? (
                                    <Col xl={12} lg={4} className=' rounded-2 mt-3'>
                                        <div className='owner-mobile my-3'>
                                            <h6 className='mb-2'>Other Features:</h6>
                                            <div className='property-other-features'>
                                                <ul className='list-unstyled ps-3 mt-3'>
                                                    {
                                                        propertyDetails?.features.map((feature, index) => (
                                                            <li key={feature.id} className='m-0 b-4 p-3 py-2 rounded-2 mb-4'>{index + 1}. &nbsp; {feature.name}</li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                ) : null
                            }

                            <KPIChart />
                        </Row>

                    </section>
                </Container>

                <Container>
                    <section className='owner-details mt-5'>
                        <div className='d-flex'>
                            <h1 className='side-heading'>Owner Details</h1>
                        </div>
                        <div>
                            {
                                role !== 'admin' && !propertyDetails?.owner_contact_number ? (
                                    <Row>
                                        <Col xl={4} lg={4} className=' rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-3 '>
                                                <h6 className='mb-3 mt-2 me-2'>Owner Name: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_full_name}</p>
                                            </div>
                                        </Col>
                                        <Col xl={4} lg={4} className=' rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-3 '>
                                                <h6 className='mb-3 mt-2 me-2'>Contact Email: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2 '>
                                                    <span className='blur-text'></span>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xl={4} lg={4} className=' rounded-2'>
                                            <div className='rs-ref-no d-flex flex-column my-3 '>
                                                <h6 className='mb-3 mt-2 me-2'>Contact Number: </h6>
                                                <p className='m-0 b-4 p-3 py-2 rounded-2'>
                                                    <span className='blur-text'></span>
                                                </p>
                                            </div>
                                        </Col>

                                    </Row>

                                ) : (
                                    <Row>
                                        {
                                            propertyDetails?.owner_full_name !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Owner Name: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_full_name}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            propertyDetails?.owner_age !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Owner Age: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_age}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }

                                        {
                                            propertyDetails?.owner_email_address !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Contact Email: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2 '>{propertyDetails?.owner_email_address}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            propertyDetails?.owner_contact_number !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Contact Number: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_contact_number}</p>
                                                    </div>
                                                </Col>

                                            )
                                        }


                                        {
                                            propertyDetails?.owner_government_id_proof !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Govt ID Proof No: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_government_id_proof}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }


                                        {
                                            propertyDetails?.owner_ownership_type !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Ownership Type: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_ownership_type}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            propertyDetails?.owner_property_documents !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Property Document: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_property_documents}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                        {
                                            propertyDetails?.owner_property_ownership_proof !== null && (
                                                <Col xl={4} lg={4} className=' rounded-2'>
                                                    <div className='rs-ref-no d-flex flex-column my-3 '>
                                                        <h6 className='mb-3 mt-2 me-2'>Property Ownership Proof: </h6>
                                                        <p className='m-0 b-4 p-3 py-2 rounded-2'>{propertyDetails?.owner_property_ownership_proof}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }

                                    </Row>
                                )
                            }
                            <Row>
                                <Col sm={12} >
                                    {
                                        role !== 'admin' && (
                                            <div className='d-flex justify-content-end'>
                                                <button onClick={applySkipTrace} className='btn bg-skip-tracing-btn text-white fw-500 d-flex gap-1 mt-3'><MdImageSearch size={22} /> Skip Trace to see Owner Complete Info</button>
                                            </div>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </section>
                </Container>

            </div>
        )

    )
}

export default DisplayDetails
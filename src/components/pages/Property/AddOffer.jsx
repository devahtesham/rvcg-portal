import { Col, Row } from 'react-bootstrap'
import { ButtonComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddLead, AddLeadHistory, AddPropertyTypes, EditLead, EditOffers, EditPropertyType, GetAllAdminUsers, GetAllCities, GetAllLeads, GetLeadsById, GetLeadSources, GetLeadType, GetOffers, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'
import { LEAD_HISTORY_STATUS, LEAD_STATUS, OFFER_STATUS } from '../../../data/global'
import { useParams } from 'react-router-dom'

const AddOffer = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();

    // console.log('[data]', data)

    useEffect(() => {
        if (isEdit) {
            setLeadDetails({
                listing_id: data?.listing?.title,
                user_id: data?.user?.name,
                status: data?.status,
                offer_price: data?.offer_price,
                accepted_price: "",
                closing_date: new Date().toISOString().split('T')[0]
            })
        }
    }, [isEdit])

    const [leadDetails, setLeadDetails] = useState({
        listing_id: "",
        user_id: "",
        status: "",
        offer_price: "",
        accepted_price: "",
        closing_date: new Date().toISOString().split('T')[0]
    })

    const leadValuesHandler = (e) => {
        let { value, name } = e.target;

        setLeadDetails({
            ...leadDetails,
            [name]: value
        })
    }

    const addLeadTypeHandler = (e) => {
        e.preventDefault()


        const payload = {
            ...leadDetails,
            listing_id: data?.listing?.id,
            user_id: data?.user?.id,
        }

        console.log('[payload]', payload)


        dispatch(EditOffers({ param: data.id, payload }))
            .unwrap()
            .then(() => {
                handleModalClose()
                dispatch(GetOffers())
            })
            .catch((error) => {
                errorNotify(error)
            })


    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Add Offer</legend>
            <form >
                <Row className='mt-3 bg-lightgray'>

                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Title"
                                type="text"
                                placeholder="Title"
                                name="listing_id"
                                value={leadDetails.listing_id}
                                onChange={leadValuesHandler}
                                disabled={true}

                            />
                        </div>

                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="User Name: *"
                                type="text"
                                placeholder="User Name"
                                name="user_id"
                                value={leadDetails.user_id}
                                onChange={leadValuesHandler}
                                disabled={true}
                            />
                        </div>
                    </Col>

                    <Col lg={6} className="p-3">
                        <div className='property-no'>
                            <DropDownComp
                                label={"Status"}
                                value={leadDetails.status}
                                options={OFFER_STATUS}
                                name="status"
                                onChange={leadValuesHandler}
                                className='p-3'
                            />

                        </div>
                    </Col>

                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Offer Price: *"
                                type="text"
                                placeholder="Offer Price"
                                name="offer_price"
                                value={leadDetails.offer_price}
                                onChange={leadValuesHandler}
                                disabled={true}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Accepted Price: *"
                                type="text"
                                placeholder="Accepted Price"
                                name="accepted_price"
                                value={leadDetails.accepted_price}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Closing Date: *"
                                type="text"
                                placeholder="Closing Date"
                                name="closing_date"
                                value={leadDetails.closing_date}
                                onChange={leadValuesHandler}
                                disabled={true}
                            />
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp
                            type="submit"
                            variant={"outline-primary"}
                            className="btn-main-clr text-white"
                            btnText={isEdit ? 'Update Offer' : 'Add Offer'}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddOffer
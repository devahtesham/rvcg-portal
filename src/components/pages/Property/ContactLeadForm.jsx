import { Col, Row } from 'react-bootstrap'
import { ButtonComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddLeadHistory, AddPropertyTypes, EditPropertyType, GetLeadsById, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'
import { LEAD_HISTORY_STATUS } from '../../../data/global'
import { useParams } from 'react-router-dom'

const ContactLeadForm = () => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const { id } = useParams()
    const [leadHistoryDetails, setLeadHistoryDetails] = useState({
        contact_date: new Date().toISOString().split('T')[0],
        note: '',
        follow_up_date: '',
        status: '',
    })

    const leadHistoryValuesHandler = (e) => {
        let { value, name } = e.target;

        setLeadHistoryDetails({
            ...leadHistoryDetails,
            [name]: value
        })
    }

    const addPropertyTypeHandler = (e) => {
        e.preventDefault()


        const payload = {
            ...leadHistoryDetails
        }

        console.log(payload)

        dispatch(AddLeadHistory({ id, payload }))
            .unwrap()
            .then(() => {
                handleModalClose()
               dispatch(GetLeadsById(id))
            })
            .catch((error) => {
                errorNotify(error)
            })
    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Contact Lead</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3 bg-lightgray'>
                    <Col lg={6}>
                        <Col lg={12} className="p-3 pb-0">
                            <div className='property-no'>
                                <InputComp
                                    label="Contacted Date: *"
                                    type="date"
                                    placeholder="Contacted Date"
                                    disabled={true}
                                    className="custom-disabled-item"
                                    name="contact_date"
                                    value={leadHistoryDetails.contact_date}
                                />
                            </div>

                        </Col>
                        <Col lg={12} className="p-3 pb-0">
                            <div className='property-no'>
                                <InputComp
                                    onChange={leadHistoryValuesHandler}
                                    required={true}
                                    label={"Followup Date: *"}
                                    type={"date"}
                                    placeholder={"Followup Date"}
                                    controlId={"floatingInput-3"}
                                    name="follow_up_date"
                                    value={leadHistoryDetails.follow_up_date}
                                />
                            </div>
                        </Col>
                        <Col lg={12} className="p-3">
                            <div className='property-no'>
                                <DropDownComp
                                    label={"Status"}
                                    options={LEAD_HISTORY_STATUS}
                                    name="status"
                                    onChange={leadHistoryValuesHandler}
                                    className='p-3'
                                />
                            </div>
                        </Col>
                    </Col>
                    <Col lg={6}>
                        <Col lg={12} className="p-3">
                            <div className='description mb-4'>
                                <DetailDescription
                                    onChange={leadHistoryValuesHandler}
                                    required={true}
                                    label={"Note: *"}
                                    type={"text"}
                                    placeholder={"Note"}
                                    controlId={"floatingInput-3"}
                                    name="note"
                                    value={leadHistoryDetails.note}
                                />
                            </div>
                        </Col>
                    </Col>






                </Row>

                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={"Submit"} onClick={addPropertyTypeHandler} />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default ContactLeadForm
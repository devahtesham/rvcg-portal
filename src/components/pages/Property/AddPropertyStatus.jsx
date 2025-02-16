import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddPropertyFeatureAction, AddPropertyStatusAction, EditPropertyFeature, EditPropertyStatus, GetPropertyFeatures, GetPropertyStatuses } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddPropertyStatus = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const [propertyTypeVal, setPropertyTypeVal] = useState("")

    useEffect(() => {
        if (isEdit) {
            setPropertyTypeVal(data.status)
        }
    }, [isEdit])

    const addPropertyTypeHandler = (e) => {
        e.preventDefault()

        if (!propertyTypeVal) {
            errorNotify("Required Fields are missing !")
            return
        }

        const payload = {
            status: propertyTypeVal
        }

        if (!isEdit) {
            dispatch(AddPropertyStatusAction(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPropertyStatuses())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(EditPropertyStatus({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPropertyStatuses())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }


    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{isEdit ? 'Update' : 'Add'} Property Status</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3'>
                    <Col xxl={12} className="">
                        <Row>
                            <Col lg={6} className='bg-lightgray p-3'>
                                <h5 className='pb-3'>{isEdit ? 'Update' : 'Add'} Property Status</h5>
                                <div className='property-no'>
                                    <InputComp onChange={(e) => setPropertyTypeVal(e.target.value)} required={true} label={"Enter Property Status: *"} type={"text"} placeholder={"Property Status"} controlId={"floatingInput-3"} name="PropertyNo" value={propertyTypeVal} />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={12} className=' mt-5'>
                                <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Property Status' : 'Add Property Status'} onClick={addPropertyTypeHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </fieldset>
    )
}

export default AddPropertyStatus
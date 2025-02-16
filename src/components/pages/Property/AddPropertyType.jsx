import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddPropertyTypes, EditPropertyType, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddPropertyType = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const [propertyTypeVal, setPropertyTypeVal] = useState("")

    useEffect(() => {
        if (isEdit) {
            setPropertyTypeVal(data.title)
        }
    }, [isEdit])

    const addPropertyTypeHandler = (e) => {
        e.preventDefault()

        if (!propertyTypeVal) {
            errorNotify("Required Fields are missing !")
            return
        }

        const payload = {
            title: propertyTypeVal
        }
        if (!isEdit) {
            dispatch(AddPropertyTypes(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPropertyTypes())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        } else {
            dispatch(EditPropertyType({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPropertyTypes())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }


    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{isEdit ? 'Update' : 'Add'} Property Type</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3'>
                    <Col xxl={12} className="">
                        <Row>
                            <Col lg={6} className='bg-lightgray p-3'>
                                <h5 className='pb-3'>{isEdit ? 'Update' : 'Add'} Property Type</h5>
                                <div className='property-no'>
                                    <InputComp onChange={(e) => setPropertyTypeVal(e.target.value)} required={true} label={"Enter Property Type: *"} type={"text"} placeholder={"Property No"} controlId={"floatingInput-3"} name="PropertyNo" value={propertyTypeVal} />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={12} className=' mt-5'>
                                <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Property Type' : 'Add Property Type'} onClick={addPropertyTypeHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </fieldset>
    )
}

export default AddPropertyType
import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddPropertyLeadSource, AddPropertyLeadType, AddPropertyTypes, EditLeadSource, EditLeadType, EditPropertyType, GetLeadSources, GetLeadType, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddLeadType = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const [propertyTypeVal, setPropertyTypeVal] = useState("")

    useEffect(() => {
        if (isEdit) {
            setPropertyTypeVal(data.type_name)
        }
    }, [isEdit])

    const addPropertyTypeHandler = (e) => {
        e.preventDefault()

        if (!propertyTypeVal) {
            errorNotify("Required Fields are missing !")
            return
        }

        const payload = {
            type_name: propertyTypeVal
        }
        if (!isEdit) {
            dispatch(AddPropertyLeadType(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetLeadType())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        } else {
            dispatch(EditLeadType({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetLeadType())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }

    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{isEdit ? 'Update' : 'Add'} Lead Type</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3'>
                    <Col xxl={12} className="">
                        <Row>
                            <Col lg={6} className='bg-lightgray p-3'>
                                <h5 className='pb-3'>{isEdit ? 'Update' : 'Add'} Lead Type</h5>
                                <div className='property-no'>
                                    <InputComp onChange={(e) => setPropertyTypeVal(e.target.value)} required={true} label={"Enter Lead Type: *"} type={"text"} placeholder={"Property No"} controlId={"floatingInput-3"} name="PropertyNo" value={propertyTypeVal} />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={12} className=' mt-5'>
                                <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Lead Type' : 'Add Lead Type'} onClick={addPropertyTypeHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </fieldset>
    )
}

export default AddLeadType
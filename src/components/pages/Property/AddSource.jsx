import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddPropertyLeadSource, AddPropertyTypes, EditLeadSource, EditPropertyType, GetLeadSources, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddSource = ({ isEdit, data }) => {
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
            dispatch(AddPropertyLeadSource(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetLeadSources())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        } else {
            dispatch(EditLeadSource({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetLeadSources())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }


    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{isEdit ? 'Update' : 'Add'} Lead Source</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3'>
                    <Col xxl={12} className="">
                        <Row>
                            <Col lg={6} className='bg-lightgray p-3'>
                                <h5 className='pb-3'>{isEdit ? 'Update' : 'Add'} Lead Source</h5>
                                <div className='property-no'>
                                    <InputComp onChange={(e) => setPropertyTypeVal(e.target.value)} required={true} label={"Enter Lead Source: *"} type={"text"} placeholder={"Property No"} controlId={"floatingInput-3"} name="PropertyNo" value={propertyTypeVal} />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={12} className=' mt-5'>
                                <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Lead Source' : 'Add Lead Source'} onClick={addPropertyTypeHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </fieldset>
    )
}

export default AddSource
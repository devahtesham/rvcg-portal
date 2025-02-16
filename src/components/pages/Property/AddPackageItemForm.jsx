import { Col, Row } from 'react-bootstrap'
import { ButtonComp, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddPackageItems, AddPropertyLeadSource, AddPropertyLeadType, AddPropertyTypes, EditLeadSource, EditLeadType, EditPackageItems, EditPropertyType, GetLeadSources, GetLeadType, GetPackages, GetPackagItems, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddPackageItemForm = ({ isEdit, data }) => {
    console.log('[data]', data)

    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const [propertyTypeVal, setPropertyTypeVal] = useState("")
    const [packageName, setPackageName] = useState("")
    const { packages } = useSelector((state) => state.PropertyMangementReducer)

    useEffect(() => {
        dispatch(GetPackages())
    }, [])

    useEffect(() => {
        if (isEdit) {
            setPropertyTypeVal(data.item_name)
            setPackageName(data.package_id)
        }
    }, [isEdit])

    const addPropertyTypeHandler = (e) => {
        e.preventDefault()

        if (!propertyTypeVal) {
            errorNotify("Required Fields are missing !")
            return
        }

        const payload = {
            package_id: +packageName,
            item_name: propertyTypeVal
        }

        console.log('[payload]',payload)

        if (!isEdit) {
            dispatch(AddPackageItems(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPackagItems())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        } else {
            dispatch(EditPackageItems({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPackagItems())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }

    }

    const packageDropDownHandler = (e) => {
        setPackageName(e.target.value)
    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{isEdit ? 'Update' : 'Add'} Package Feature</legend>
            <form onSubmit={addPropertyTypeHandler} >
                <Row className='mt-3'>
                    <Col lg={6} className=' p-3'>
                        <div className='property-no'>
                            <InputComp onChange={(e) => setPropertyTypeVal(e.target.value)} required={true} label={"Enter Package Feature: *"} type={"text"} placeholder={"Property No"} controlId={"floatingInput-3"} name="PropertyNo" value={propertyTypeVal} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='swimming-poo mt-3'>
                            <DropDownComp
                                label={"Package"}
                                value={packageName}
                                options={packages.length ? packages.map(item => { return { label: item[1], value: item[0] } }) : []}
                                name="property_type_id"
                                onChange={packageDropDownHandler}
                                className='p-3'
                            />
                        </div>
                    </Col>

                    <Row>
                        <Col lg={12} className=' mt-1'>
                            <ButtonComp type="submit" variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Package Feature' : 'Add Package Feature'} onClick={addPropertyTypeHandler} />
                        </Col>
                    </Row>
                </Row>
            </form>
        </fieldset>
    )
}

export default AddPackageItemForm
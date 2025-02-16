import { Col, Row } from 'react-bootstrap'
import { ButtonComp, CheckBoxComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddLead, AddLeadHistory, AddPackage, AddPropertyTypes, EditLead, EditPackage, EditPropertyType, GetAllAdminUsers, GetAllCities, GetAllLeads, GetLeadsById, GetLeadSources, GetLeadType, GetPackages, GetPackagItems, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'
import { LEAD_HISTORY_STATUS, LEAD_STATUS } from '../../../data/global'
import { useParams } from 'react-router-dom'

const AddPackageForm = ({ isEdit, data }) => {

    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const { id } = useParams()
    const [other_features, setOtherFeatures] = useState([])
    const { packageItems } = useSelector((state) => state.PropertyMangementReducer)

    console.log('[data]', data)

    useEffect(() => {
        if (isEdit) {
            setPackageDetails({
                name: data.name,
                price: data.price,
                duration: data.duration,
            })

            setOtherFeatures(data.items.map(packageItem => packageItem.item_name))
        }
    }, [isEdit])

    useEffect(() => {
        dispatch(GetPackagItems())
    }, [])

    const [packageDetails, setPackageDetails] = useState({
        name: "",
        price: "",
        duration: "",
    })

    const packageValuesHandler = (e) => {
        let { value, name } = e.target;

        setPackageDetails({
            ...packageDetails,
            [name]: value
        })
    }

    const addLeadTypeHandler = (e) => {
        e.preventDefault()


        const payload = {
            ...packageDetails,
            items: other_features
        }

        console.log(payload)

        if (!isEdit) {
            dispatch(AddPackage(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPackages())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(EditPackage({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetPackages())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }
    }

    const featuresCheckHandler = (e) => {
        console.log('[e.target.name]', e.target.name)
        console.log('[e.target.checked]', e.target.checked)
        if (e.target.checked) {
            // add this id to the array
            setOtherFeatures([...other_features, e.target.name])
        } else {
            // remove this id from the array
            console.log('[other_features]', other_features)
            const filteredItems = other_features.filter(item => item !== e.target.name);
            console.log('[filteredItems]', filteredItems)
            setOtherFeatures(filteredItems)
        }
    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Add Package</legend>
            <form >
                <Row className='mt-3 bg-lightgray'>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Package Name: *"
                                type="text"
                                placeholder="Package Name"
                                name="name"
                                value={packageDetails.name}
                                onChange={packageValuesHandler}

                            />
                        </div>

                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Price: *"
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={packageDetails.price}
                                onChange={packageValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Duration: *"
                                type="number"
                                placeholder="Duration"
                                name="duration"
                                value={packageDetails.duration}
                                onChange={packageValuesHandler}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className='mt-3'>

                    <h5 className='mb-3 p-4 pb-0'>Package Items</h5>

                    {
                        packageItems.length ? packageItems.map((item, index) => {
                            return (
                                <Col key={index} xxl={4} className="p-3">
                                    {/* */}
                                    <CheckBoxComp className={""} id={item[0]} label={item[1]} name={item[1]} onChange={featuresCheckHandler} checked={other_features.includes(item[1]) ? true : false} />
                                </Col>
                            )
                        }) : null
                    }


                </Row>

                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp
                            type="submit"
                            variant={"outline-primary"}
                            className="btn-main-clr text-white"
                            btnText={isEdit ? 'Update Package' : 'Add Package'}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddPackageForm
import { Col, Row } from 'react-bootstrap'
import { ButtonComp, CheckBoxComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddLead, AddLeadHistory, AddPackage, AddPropertyTypes, EditLead, EditPackage, EditPropertyType, GetAllAdminUsers, GetAllCities, GetAllLeads, getAllUsersAction, GetLeadsById, GetLeadSources, GetLeadType, GetPackages, GetPackagItems, GetPropertyTypes, RegisterUser, UpdateUserProfile } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import { LEAD_HISTORY_STATUS, LEAD_STATUS, USER_ACTIVATION_STATUS } from '../../../data/global'
import { useParams } from 'react-router-dom'
import { ALL_ROLES } from '../../../data'

const AddUserForm = ({ isEdit, data }) => {
    console.log('[data]', data)
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();

    const [packageDetails, setPackageDetails] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        referral_codes: [],
        is_active: 1,
    })
    const [role, setRole] = useState("")

    useEffect(() => {
        if (isEdit) {
            setRole(data.role)
        }
    }, [isEdit])

    const packageValuesHandler = (e) => {
        let { value, name } = e.target;
        setPackageDetails({
            ...packageDetails,
            [name]: name === 'referral_codes' ? [value] : value
        })


    }

    const addLeadTypeHandler = (e) => {

        e.preventDefault()

        if (packageDetails.password !== packageDetails.password_confirmation) {
            errorNotify("password and confirm password must be same !")
            return
        }

        const payload = {
            ...packageDetails,
            is_active: +packageDetails.is_active
        }

        const editPayload = {
            role
        }

        console.log('[payload]', editPayload)

        if (!isEdit) {
            dispatch(RegisterUser(payload))
                .unwrap()
                .then(() => {
                    successNotify("user Created Successfully !")
                    handleModalClose()
                    dispatch(getAllUsersAction())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(UpdateUserProfile({ id: data.id, data: editPayload }))
                .unwrap()
                .then(() => {
                    successNotify("Role Updated Successfully !")
                    handleModalClose()
                    dispatch(getAllUsersAction())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }
    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">{!isEdit ? "Add User" : "Update Role"}</legend>
            <form >
                {
                    !isEdit ? (
                        <Row className='mt-3 bg-lightgray'>
                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <InputComp
                                        label="Name: *"
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={packageDetails.name}
                                        onChange={packageValuesHandler}
                                        required={true}

                                    />
                                </div>

                            </Col>
                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <InputComp
                                        label="Email: *"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={packageDetails.email}
                                        onChange={packageValuesHandler}
                                        required={true}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <InputComp
                                        label="Password: *"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={packageDetails.password}
                                        onChange={packageValuesHandler}
                                        required={true}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <InputComp
                                        label="Confirm Password: *"
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="password_confirmation"
                                        value={packageDetails.password_confirmation}
                                        onChange={packageValuesHandler}
                                        required={true}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} className="p-3">
                                <div className='property-no'>
                                    <DropDownComp
                                        label={"Activation Status"}
                                        value={packageDetails.is_active}
                                        options={USER_ACTIVATION_STATUS}
                                        name="is_active"
                                        onChange={packageValuesHandler}
                                        className='p-3'
                                        required={true}
                                    />

                                </div>
                            </Col>

                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <InputComp
                                        label="Referral Code: *"
                                        type="text"
                                        placeholder="Referral Code"
                                        name="referral_codes"
                                        value={packageDetails.referral_codes}
                                        onChange={packageValuesHandler}
                                        required={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row className='mt-3 bg-lightgray pb-3'>
                            <Col lg={6} className="pt-3">
                                <div className='property-no'>
                                    <DropDownComp
                                        label={"Role"}
                                        value={role}
                                        options={ALL_ROLES}
                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                        className='p-3'
                                        required={true}
                                    />
                                </div>

                            </Col>
                        </Row>
                    )
                }


                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp
                            type="submit"
                            variant={"outline-primary"}
                            className="btn-main-clr text-white"
                            btnText={!isEdit ? "Add User" : "Update Role"}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddUserForm

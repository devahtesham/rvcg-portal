import { Col, Row } from 'react-bootstrap'
import { ButtonComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddLead, AddLeadHistory, AddPropertyTypes, EditLead, EditPropertyType, GetAllAdminUsers, GetAllCities, GetAllLeads, GetLeadsById, GetLeadSources, GetLeadType, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'
import { LEAD_HISTORY_STATUS, LEAD_STATUS } from '../../../data/global'
import { useParams } from 'react-router-dom'

const AddLeadForm = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const { id } = useParams()
    const { adminUsers, leadTypes, leadSources, cities } = useSelector((state) => state.PropertyMangementReducer)
    const { role } = JSON.parse(localStorage.getItem('user'))

    console.log('[data]', data)

    useEffect(() => {
        if (isEdit) {
            setLeadDetails({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                assigned_to: role === 'admin' ? data.assigned_to.name : 1,
                lead_type_id: data.lead_type.type_name,
                status: data.status,
                lead_source_id: data.lead_source.title,
                position: data.position,
                website: data.website,
                lead_value: data.lead_value,
                company: data.company,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                zip_code: data.zip_code,
                default_language: "English",
                contacted_today: data.contacted_today ? "Yes" : 'No',
                special_notes: data.special_notes,
                description: data.description,
                tags: data.tags.join(',')
            })
        }
    }, [isEdit])

    useEffect(() => {
        dispatch(GetAllAdminUsers())
        dispatch(GetLeadType())
        dispatch(GetLeadSources())
        dispatch(GetAllCities())
    }, [])

    const [leadDetails, setLeadDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        assigned_to: role === 'admin' ? "" : 1,
        lead_type_id: "",
        status: "",
        lead_source_id: "",
        position: "",
        website: "",
        lead_value: "",
        company: "",
        address: "",
        city: "",
        state: "",
        country: "United States of America",
        zip_code: "",
        default_language: "English",
        contacted_today: "",
        special_notes: "",
        description: "",
        tags: ""
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
            contacted_today: leadDetails.contacted_today === 'true' ? true : false,
            lead_type_id: +leadDetails.lead_type_id,
            lead_source_id: +leadDetails.lead_source_id,
            lead_value: +leadDetails.lead_value,
            tags: leadDetails.tags.split(','),
        }

        console.log(payload)

        if (!isEdit) {
            dispatch(AddLead(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetAllLeads())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(EditLead({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetAllLeads())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }
    }


    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Add Lead</legend>
            <form >
                <Row className='mt-3 bg-lightgray'>

                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="First Name: *"
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={leadDetails.first_name}
                                onChange={leadValuesHandler}

                            />
                        </div>

                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Last Name: *"
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={leadDetails.last_name}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Email: *"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={leadDetails.email}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <InputComp
                                label="Phone: *"
                                type="number"
                                placeholder="Email"
                                name="phone"
                                value={leadDetails.phone}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>

                    {
                        role === 'admin' && (
                            <Col lg={6} className="p-3">
                                <div className='property-no'>
                                    <DropDownComp
                                        label={"Assigned To"}
                                        value={leadDetails.assigned_to}
                                        options={adminUsers.length ? adminUsers.map(item => { return { label: item[1], value: item[0] } }) : []}
                                        name="assigned_to"
                                        onChange={leadValuesHandler}
                                        className={`p-3`}

                                    />

                                </div>
                            </Col>
                        )
                    }

                    <Col lg={6} className="p-3">
                        <div className='property-no'>
                            <DropDownComp
                                label={"Lead Type"}
                                value={leadDetails.lead_type_id}
                                options={leadTypes.length ? leadTypes.map(item => { return { label: item[1], value: item[0] } }) : []}
                                name="lead_type_id"
                                onChange={leadValuesHandler}
                                className='p-3'
                            />

                        </div>
                    </Col>

                    <Col lg={6} className="p-3">
                        <div className='property-no'>
                            <DropDownComp
                                label={"Status"}
                                value={leadDetails.status}
                                options={LEAD_STATUS}
                                name="status"
                                onChange={leadValuesHandler}
                                className='p-3'
                            />

                        </div>
                    </Col>

                    <Col lg={6} className="p-3">
                        <div className='property-no'>
                            <DropDownComp
                                label={"Source"}
                                value={leadDetails.lead_source_id}
                                options={leadSources.length ? leadSources.map(item => { return { label: item[1], value: item[0] } }) : []}
                                name="lead_source_id"
                                onChange={leadValuesHandler}
                                className='p-3'
                            />
                        </div>
                    </Col>

                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Position: *"
                                type="text"
                                placeholder="Position"
                                name="position"
                                value={leadDetails.position}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Website: *"
                                type="text"
                                placeholder="Website"
                                name="website"
                                value={leadDetails.website}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Lead Value: *"
                                type="number"
                                placeholder="Lead Value"
                                name="lead_value"
                                value={leadDetails.lead_value}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Company: *"
                                type="text"
                                placeholder="Company"
                                name="company"
                                value={leadDetails.company}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Address: *"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={leadDetails.address}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>

                    <Col lg={6} className="p-3 pb-0">
                        <div className='swimming-pool'>
                            <InputComp
                                type="text"
                                label={"City"}
                                placeholder={"City"}
                                value={leadDetails.city}
                                name="city"
                                onChange={leadValuesHandler}
                                className=''
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='swimming-pool'>
                            <InputComp
                                type="text"
                                label={"State"}
                                placeholder={"State"}
                                value={leadDetails.state}
                                name="state"
                                onChange={leadValuesHandler}
                                className=''
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='swimming-pool'>
                            <InputComp
                                type="text"
                                label={"Country"}
                                placeholder={"City"}
                                value={leadDetails.country}
                                name="country"
                                onChange={leadValuesHandler}
                                className='custom-disabled-item'
                                disabled={true}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='property-no'>
                            <InputComp
                                label="Zip code: *"
                                type="number"
                                placeholder="Zip code"
                                name="zip_code"
                                value={leadDetails.zip_code}
                                onChange={leadValuesHandler}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="p-3 pb-0">
                        <div className='swimming-pool'>
                            <InputComp
                                label={"Default Language"}
                                value={leadDetails.default_language}
                                name="default_language"
                                onChange={leadValuesHandler}
                                disabled={true}
                                className="custom-disabled-item"
                            />
                        </div>
                    </Col>

                    <Col lg={6} className="p-3 pb-0">
                        <div className='swimming-pool'>
                            <DropDownComp
                                label={"Contacted Today"}
                                value={leadDetails.contacted_today}
                                options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                name="contacted_today"
                                onChange={leadValuesHandler}
                                className='p-3'
                            />
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className='description my-4'>
                            <DetailDescription
                                value={leadDetails.special_notes}
                                controlId={"descriptionBox-1"}
                                label={"Special Notes"}
                                name="special_notes"
                                onChange={leadValuesHandler}
                                placeholder={"Special Notes"}
                            />
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className='description mb-4'>
                            <DetailDescription
                                value={leadDetails.description}
                                controlId={"descriptionBox-1"}
                                label={"Description"}
                                name="description"
                                onChange={leadValuesHandler}
                                placeholder={"Description"}
                            />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className='description mb-4'>
                            <InputComp
                                label={"Tags (Tag1,Tag2)"}
                                name="tags"
                                onChange={leadValuesHandler}
                                placeholder={"Tags (Tag1,Tag2)"}
                                value={leadDetails.tags}
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
                            btnText={isEdit ? 'Update Lead' : 'Add Lead'}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddLeadForm
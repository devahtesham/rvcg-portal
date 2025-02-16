import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddVendorAction, EditVendor, GetVendors } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'
import { useParams } from 'react-router-dom'
import { FaPlus, FaTrash } from 'react-icons/fa'

const AddVendor = ({ isEdit, data }) => {

    const { handleModalClose } = useModal()
    const dispatch = useDispatch();

    console.log('[data]', data)

    useEffect(() => {
        if (isEdit) {
            setLeadDetails({
                address: data.address,
                state: data.state,
                city: data.city,
                zip_code: data.zipcode,
            })

            setFormData({
                services: data.services
            })
        }
    }, [isEdit])


    const [leadDetails, setLeadDetails] = useState({
        address: '',
        state: '',
        city: '',
        zip_code: '',
    })

    const [formData, setFormData] = useState({
        services: [{
            service_name: '',
            price: '',
            service_city: '',
            description: ''
        }]
    });

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
            user_id: JSON.parse(localStorage.getItem('user'))?.userId,
            services: formData.services
        }
        if (!isEdit) {

            dispatch(AddVendorAction(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetVendors())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(EditVendor({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetVendors())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }
    }

    const handleServiceChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map((service, i) =>
                i === index ? { ...service, [field]: value } : service
            )
        }));
    };

    const handleAddField = () => {
        setFormData(prev => ({
            ...prev,
            services: [...prev.services, {
                service_name: '',
                price: '',
                service_city: '',
                description: ''
            }]
        }));
    };

    const handleRemoveField = (index) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index)
        }));
    };

    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Add Vendor</legend>
            <form >
                <Row className='mt-3 bg-lightgray'>
                    <Col lg={12} className="p-3 pb-0">
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
                                type="number"
                                label={"Zipcode"}
                                placeholder={"zipcode"}
                                value={leadDetails.zip_code}
                                name="zip_code"
                                onChange={leadValuesHandler}
                                className=''
                            />
                        </div>
                    </Col>

                </Row>
                <Row>
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4>Add Services</h4>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => handleAddField()}
                            >
                                <FaPlus className="me-1" /> Add Service
                            </button>
                        </div>
                        <div className="card-body">
                            {formData.services.map((service, index) => (
                                <div key={index} className="input-group mb-5 gap-3 align-items-start justify-content-between">
                                    <div className='flex-1'>
                                        <div className='d-flex gap-2 mb-2'>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={service.service_name}
                                                placeholder="Service Name"
                                                onChange={(e) => handleServiceChange(index, 'service_name', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={service.price}
                                                placeholder="Price"
                                                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={service.service_city}
                                                placeholder="City"
                                                onChange={(e) => handleServiceChange(index, 'service_city', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                className="form-control"
                                                value={service.description}
                                                placeholder="Service Description"
                                                rows={4}
                                                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleRemoveField(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Row>

                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp
                            type="submit"
                            variant={"outline-primary"}
                            className="btn-main-clr text-white"
                            btnText={isEdit ? 'Update Service' : 'Add Service'}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddVendor
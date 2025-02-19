import { useEffect, useState } from 'react'
import { Row, Col, Form } from "react-bootstrap"
import { ButtonComp, CheckBoxComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import "./EditDetails.css"
import { errorNotify } from '../../../Toastify/Toastify'
import AddPropertyDetailsMap from './Map/AddPropertyDetailsMap'
import { useDispatch, useSelector } from 'react-redux'
import { AddPropertyAction, EditProperty, GetAllCities, GetAllProperties, GetLeadType, GetPropertyFeatures, GetPropertyStatuses, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import UploadDragFile from '../../UploadDragFile/UploadDragFile'
import MultiImageUpload from '../../MultiImageUploader/MultiImageUploader'
import { useModal } from '../../../hooks/useModal'
import { OWNERSHIP_TYPE } from '../../../data/global'
import axios from 'axios'

const AddProperty = ({ isEdit, data }) => {
    const dispatch = useDispatch();
    const { handleModalClose } = useModal()
    const { cities, propertyTypes, propertyStatuses, propertyFeatures,leadTypes } = useSelector((state) => state.PropertyMangementReducer)
    console.log('[data]', data);

    const [gdrp_agreement, setGdrpAgreement] = useState("")
    const [property_images, setPropertyImages] = useState([])

    const [other_features, setOtherFeatures] = useState([])


    useEffect(() => {
        if (isEdit) {
            setPropertyDetails({
                listing_date: new Date().toISOString().split('T')[0],
                title: data.title,
                city_id: data.city_id,
                country_id: data.country_id,
                property_type_id: data.property_type_id,
                lead_types_id: data.lead_types_id,
                property_status_id: data.property_status_id,
                price: data.price,
                square_foot: data.square_foot,
                year_built: data.year_built,
                is_approved: data.is_approved ? 1 : 0,
                zip_code: data.zip_code,
                lot_size: data.lot_size,
                monthly_rent: data.monthly_rent,
                cap_rate: data.cap_rate,
                address: data.address,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                repair_cost: data.repair_cost,
                wholesale_fee: data.wholesale_fee,
                price_per_square_feet: data.price_per_square_feet,
                is_featured: data.is_featured ? 1 : 0,
                description: data.description,
                owner_full_name: data.owner_full_name,
                owner_age: data.owner_age,
                owner_ownership_type: data.owner_ownership_type,
                owner_property_documents: data.owner_property_documents,
                owner_email_address: data.owner_email_address,
                owner_government_id_proof: data.owner_government_id_proof,
                owner_contact_number: data.owner_contact_number,
            })

            document.getElementById("latitude").value = +data.latitude
            document.getElementById("longitude").value = +data.longitude
            setOtherFeatures(data.features.map(feature => feature.id))


        }
    }, [isEdit])

    // for getting property details
    let [propertyDetails, setPropertyDetails] = useState({
        listing_date: new Date().toISOString().split('T')[0],
        title: "",
        city_id: "",
        country_id: "",
        property_type_id: "",
        lead_types_id: "",
        property_status_id: "",
        price: "",
        square_foot: "",
        year_built: "",
        is_approved: "",
        zip_code: "",
        lot_size: "",
        monthly_rent: "",
        cap_rate: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        repair_cost: "",
        wholesale_fee: "",
        price_per_square_feet: "",
        is_featured: "",
        description: "",
        owner_full_name: "",
        owner_age: "",
        owner_ownership_type: "",
        owner_property_documents: "",
        owner_email_address: "",
        owner_government_id_proof: "",
        owner_contact_number: "",

    })

    useEffect(() => {
        dispatch(GetAllCities())
        dispatch(GetPropertyStatuses())
        dispatch(GetPropertyTypes())
        dispatch(GetPropertyFeatures())
         dispatch(GetLeadType())
    }, [])

    const handleOwnerPropertyDocument = () => { }



    // handle property details data
    const propertyDetailsHandler = (e) => {
        let { value, name } = e.target;
        if (name === "is_approved" || name === "is_featured") {
            value = +value
        }

        setPropertyDetails({
            ...propertyDetails,
            [name]: value
        })
    }

    // function calls for click on final Add details button
    const addDetailsHandler = () => {
        // for latitude and longitude
        let lat = +document.getElementById("latitude").value
        let long = +document.getElementById("longitude").value

        // validate the latitude and longitude
        if (lat === 0 || long === 0) {
            errorNotify("Latitude & Longitude are required Fields❗");
            return
        }

        // validation for price must be greater than repair cost and wholesale fee
        if (+propertyDetails.repair_cost > +propertyDetails.price) {
            errorNotify("Repair Cost can not be greater than price !")
            return
        }

        if (+propertyDetails.wholesale_fee > +propertyDetails.price) {
            errorNotify("Wholesale Fee can not be greater than price !")
            return
        }

        const formData = new FormData();
        formData.append('image', gdrp_agreement);

        const payload = {
            ...propertyDetails,
            property_images: localStorage.getItem('propertyImages'),
            latitude: String(lat),
            longitude: String(long),
            other_features,
            city_id: +propertyDetails.city_id,
            country_id: +propertyDetails.country_id,
            price: +propertyDetails.price,
            price_per_square_feet: +propertyDetails.price_per_square_feet,
            repair_cost: +propertyDetails.repair_cost,
            square_foot: +propertyDetails.square_foot,
            wholesale_fee: +propertyDetails.wholesale_fee,
            gdrp_image: formData
        }
        console.log('[payload]', payload);

        if (!isEdit) {
            dispatch(AddPropertyAction(payload))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetAllProperties())
                })
                .catch((error) => {
                    errorNotify(error)
                })
        } else {
            dispatch(EditProperty({ param: data.id, payload }))
                .unwrap()
                .then(() => {
                    handleModalClose()
                    dispatch(GetAllProperties())
                })
                .catch((error) => {
                    errorNotify(error)
                })

        }


    }

    const handleGDRPFileSelect = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const headers = {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        axios.post('https://rvcg-git.designsbits.com/api/admin/temp_files', formData, { headers })
            .then((response) => {
                console.log('[response]', response);
            })
            .catch((error) => {
                console.log('[error]', error);
            });
    }

    const handleMultiImgSelect = (files) => {
        const filesData = files.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
        }));
        localStorage.setItem('propertyImages', JSON.stringify(filesData));
    }

    const featuresCheckHandler = (e) => {
        console.log('[e.target.name]', Number(e.target.name))
        console.log('[e.target.checked]', e.target.checked)
        if (e.target.checked) {
            // add this id to the array
            setOtherFeatures([...other_features, Number(e.target.name)])
        } else {
            // remove this id from the array
            console.log('[other_features]', other_features)
            const filteredItems = other_features.filter(item => item !== Number(e.target.name));
            console.log('[filteredItems]', filteredItems)
            setOtherFeatures(filteredItems)
        }
    }


    return (
        <>
            <section className='main-section'>
                {/* property details */}
                <section className='mt-4'>
                    <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
                        <legend className="reset mb-3 side-heading px-5 mx-auto">Property Details</legend>
                        <Row className='mb-3 d-flex justify-content-around'>
                            <Col xxl={6} className="bg-lightgray p-3">
                                <Row>
                                    <Col lg={12}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.title} required={true} label={"Title: *"} type={"text"} placeholder={"Title"} controlId={"floatingInput-3"} name="title" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='swimming-pool  mb-4'>
                                            <DropDownComp label={"City"} value={propertyDetails.city_id} options={cities} name="city_id" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='swimming-pool  mb-4'>
                                            <DropDownComp label={"Country"} value={propertyDetails.country_id} options={[{ label: 'United States of America', value: 185 }]} name="country_id" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className='swimming-pool  mb-4'>
                                            <DropDownComp label={"Property Type"} value={propertyDetails.property_type_id} options={propertyTypes.length ? propertyTypes.map(item => { return { label: item[1], value: item[0] } }) : []} name="property_type_id" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>
                                    <Col lg={6} className="">
                                        <div className='property-no'>
                                            <DropDownComp
                                                label={"Lead Type"}
                                                value={propertyDetails.lead_types_id}
                                                options={leadTypes.length ? leadTypes.map(item => { return { label: item[1].type_name, value: item[0] } }) : []}
                                                name="lead_types_id"
                                                onChange={propertyDetailsHandler}
                                                className='p-3'
                                            />

                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='swimming-pool  mb-4'>
                                            <DropDownComp label={"Property Status"} value={propertyDetails.property_status_id} options={propertyStatuses.length ? propertyStatuses.map(item => { return { label: item[1], value: item[0] } }) : []} name="property_status_id" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='price'>
                                            <InputComp value={propertyDetails.price} label={"Price in ($):"} type={"number"} placeholder={"price"} controlId={"floatingInput-4"} name="price" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='amc-date'>
                                            <InputComp
                                                label="Listing Date: *"
                                                type="date"
                                                placeholder="Listing Date"
                                                disabled={true}
                                                className="custom-disabled-item"
                                                name="listing_date"
                                                value={propertyDetails.listing_date}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='square_foot'>
                                            <InputComp value={propertyDetails.square_foot} label={"Square Foot:"} type={"number"} placeholder={"Square Foot"} controlId={"floatingInput-4"} name="square_foot" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='year_built'>
                                            <InputComp value={propertyDetails.year_built} label={"Year Built:"} type={"number"} placeholder={"Year Built"} controlId={"floatingInput-4"} name="year_built" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className='is_approved'>
                                            <DropDownComp label={"Approved"} value={propertyDetails.is_approved} options={[{ label: "YES", value: 1 }, { label: "NO", value: 0 }]} name="is_approved" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className='zip_code'>
                                            <InputComp value={propertyDetails.zip_code} label={"Zip Code:"} type={"number"} placeholder={"Zip Code"} controlId={"floatingInput-4"} name="zip_code" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                            <Col xxl={5} className="bg-lightgray p-3">
                                <Row>
                                    <Col lg={6}>
                                        <div className='monthly_rent'>
                                            <InputComp value={propertyDetails.monthly_rent} label={"Monthly Rent:"} type={"number"} placeholder={"Monthly Rent"} controlId={"floatingInput-4"} name="monthly_rent" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='cap_rate'>
                                            <InputComp value={propertyDetails.cap_rate} label={"Cap Rate:"} type={"number"} placeholder={"Cap Rate"} controlId={"floatingInput-4"} name="cap_rate" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className='address'>
                                            <InputComp value={propertyDetails.address} label={"Address:"} type={"text"} placeholder={"Address"} controlId={"floatingInput-4"} name="address" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='bedrooms'>
                                            <InputComp value={propertyDetails.bedrooms} label={"Bedrooms:"} type={"number"} placeholder={"Bedrooms"} controlId={"floatingInput-4"} name="bedrooms" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='bathrooms'>
                                            <InputComp value={propertyDetails.bathrooms} label={"Bathrooms:"} type={"number"} placeholder={"Bathrooms"} controlId={"floatingInput-4"} name="bathrooms" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='repair_cost'>
                                            <InputComp value={propertyDetails.repair_cost} label={"Repair Cost:"} type={"number"} placeholder={"Estimated ROI"} controlId={"floatingInput-4"} name="repair_cost" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='wholesale_fee'>
                                            <InputComp value={propertyDetails.wholesale_fee} label={"Wholesale Fee:"} type={"number"} placeholder={"Estimated ROI"} controlId={"floatingInput-4"} name="wholesale_fee" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className='price_per_square_feet'>
                                            <InputComp value={propertyDetails.price_per_square_feet} label={"Price Per SqFt:"} type={"number"} placeholder={"Estimated ROI"} controlId={"floatingInput-4"} name="price_per_square_feet" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='lot_size'>
                                            <InputComp value={propertyDetails.lot_size} label={"Lot Size:"} type={"number"} placeholder={"Lot Size"} controlId={"floatingInput-4"} name="lot_size" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='is_featured'>
                                            <DropDownComp label={"Featured"} value={propertyDetails.is_featured} options={[{ label: "YES", value: 1 }, { label: "NO", value: 0 }]} name="is_featured" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                        <Row className='bg-lightgray mt-4'>
                            <Col xxl={6} className=" p-4">
                                <h5 className='mb-3'>GDPR Agreement</h5>
                                <UploadDragFile onFileSelect={handleGDRPFileSelect} />
                            </Col>
                            <Col xxl={6} className=" p-4">
                                <h5 className='mb-3'>Property Images</h5>
                                <MultiImageUpload onFilesSelect={handleMultiImgSelect} />
                            </Col>
                        </Row>
                    </fieldset>

                    {/* Add property map */}
                    <fieldset className='reset mt-5 p-4'>
                        <legend className="reset side-heading px-5 mx-auto">Location Details</legend>
                        <Row className='d-flex justify-content-center bg-lightgray'>
                            <Col xxl={6} className=" p-3">
                                <Row>
                                    <Col>
                                        <AddPropertyDetailsMap />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xxl={6} className=" p-3">
                                <Col lg={12}>
                                    <div className='add-property-map'>
                                        <InputComp controlId={"floatingInput-22"} name="latitude" id="latitude" label={"Latitude: "} type={"text"} placeholder={"Latitude"} />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className='add-property-map'>
                                        <InputComp controlId={"floatingInput-33"} name="longitude" id="longitude" label={"Longitude: "} type={"text"} placeholder={"Longitude"} />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className='description mb-4'>
                                        <DetailDescription value={propertyDetails.description} controlId={"descriptionBox-1"} label={"Description"} name="description" onChange={propertyDetailsHandler} placeholder={"Description"} />
                                    </div>
                                </Col>

                            </Col>
                        </Row>



                        <Row className='bg-lightgray mt-4'>
                            <h5 className='mb-3 p-4 pb-0'>Other Features</h5>

                            {
                                propertyFeatures.length ? propertyFeatures.map((item, index) => {
                                    return (
                                        <Col key={index} xxl={3} className="p-3">
                                            {/* */}
                                            <CheckBoxComp className={""} id={item[1]} label={item[1]} name={item[0]} onChange={featuresCheckHandler} checked={other_features.includes(item[0]) ? true : false} />
                                        </Col>
                                    )
                                }) : null
                            }


                        </Row>

                    </fieldset>

                    <fieldset className="reset mt-5 p-4 pt-0 t-0 ">
                        <legend className="reset mb-3 side-heading px-5 mx-auto">Owner Details</legend>
                        <Row className='mb-3 d-flex justify-content-around'>
                            <Col xxl={6} className="bg-lightgray p-3">
                                <Row>
                                    <Col lg={12}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.owner_full_name} required={true} label={"Owner Name: *"} type={"text"} placeholder={"Owner Name"} controlId={"floatingInput-3"} name="owner_full_name" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.owner_age} required={true} label={"Owner Age: *"} type={"text"} placeholder={"Owner Age"} controlId={"floatingInput-3"} name="owner_age" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className='swimming-pool  mb-4'>
                                            <DropDownComp label={"Ownership Type"} value={propertyDetails.owner_ownership_type} options={OWNERSHIP_TYPE} name="owner_ownership_type" onChange={propertyDetailsHandler} className='p-3' />
                                        </div>
                                    </Col>

                                    <Col lg={12} className=" p-4">
                                        <h5 className='mb-3'>Owner Property Document</h5>
                                        {/* <UploadDragFile onFileSelect={handleOwnerPropertyDocument} /> */}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xxl={5} className="bg-lightgray p-3">
                                <Row>
                                    <Col lg={12}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.owner_email_address} required={true} label={"Owner Email Address: *"} type={"email"} placeholder={"Owner Email Address"} controlId={"floatingInput-3"} name="owner_email_address" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.owner_government_id_proof} required={true} label={"Govt ID Proof: *"} type={"number"} placeholder={"Govt ID Proof"} controlId={"floatingInput-3"} name="owner_government_id_proof" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className='property-no'>
                                            <InputComp value={propertyDetails.owner_contact_number} required={true} label={"Owner Contact#: *"} type={"number"} placeholder={"Owner Contact#"} controlId={"floatingInput-3"} name="owner_contact_number" onChange={propertyDetailsHandler} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </fieldset>
                </section>

                <Row>
                    <Col lg={12} className='text-end mt-5'>
                        <ButtonComp variant={"outline-primary"} className="btn-main-clr text-white" btnText={isEdit ? 'Update Property Details' : 'Add Property Details'} onClick={addDetailsHandler} />
                    </Col>
                </Row>

            </section>

        </>
    )
}

export default AddProperty
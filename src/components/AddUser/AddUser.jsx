import React from 'react'
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useModal } from '../../hooks/useModal';
import { Col, Form, Row } from 'react-bootstrap';
import { DetailDescription, DropDownComp, InputComp } from '../bootstrap';
import RadioComp from '../bootstrap/RadioComp';
import { RiLockPasswordFill } from "react-icons/ri"
import { BiSolidHide } from "react-icons/bi"      // hide password
import { BiSolidShow } from "react-icons/bi"      // show password
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import { IoMdSend } from "react-icons/io";
import AccordiansComp from "../MUI/AccordiansComp"
import SimpleAccordian from '../MUI/DataGrid/SimpleAccordian';



const AddUser = () => {
    const { handleModalClose } = useModal()
    return (
        <section>
            <div className="add-user-header d-flex justify-content-between align-items-center shadow-sm py-4 px-3">
                <div className="user-heading d-flex align-items-center gap-2">
                    <span>
                        <FaUser size={20} color='#0d6efd' />
                    </span>
                    <span className='m-0'>
                        Add User
                    </span>
                </div>
                <div className="close-modal" onClick={handleModalClose}>
                    <RxCross2 size={20} color='#0d6efd' />
                </div>
            </div>

            <div className="user-personal-info mt-3">
                <form action="" className='p-3'>
                    <h5 className='fw-bold mb-4'>Personal Information</h5>
                    <Row>
                        <Col lg={4}>
                            <InputComp required={true} label={"First Name: *"} type={"text"} placeholder={"First Name"} controlId={"add-emp-1"} name="" />
                        </Col>
                        <Col lg={4}>
                            <InputComp required={true} label={"Last Name: *"} type={"text"} placeholder={"Last Name"} controlId={"add-emp-2"} name="" />
                        </Col>
                        <Col lg={4}>
                            <DropDownComp options={['Employee', 'Test-1', 'Test-2']} name="" className='p-3 mb-lg-0 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <label htmlFor="">Gender*</label>
                            <div className='d-flex align-items-center gap-3 mt-2'>
                                <RadioComp label={"Male"} id={"male"} name={"gender"} />
                                <RadioComp label={"Female"} id={"female"} name={"gender"} />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className='dob'>
                                <InputComp label="Date of Birth: *" type={"date"} placeholder={"Date of Birth"} name="" />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="user-mob-no">
                                <InputComp label={`Mobile Number: *`} type={"number"} placeholder={`Mobile Number`} controlId={""} name={''} />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className={`user-email`}>
                                <InputComp label={`Email: *`} type={"email"} placeholder={`Email`} controlId={""} name={''} />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <InputComp required={true} label={"Password: *"} type={"password"} placeholder={"Password"} controlId={"password"} name="" />
                        </Col>

                        <Col lg={4}>
                            <InputComp required={true} label={"Confirm password: *"} type={"password"} placeholder={"Confirm Password"} controlId={"confirm-password"} name="" />
                        </Col>

                        <Col lg={12}>
                            <div className='user-address mb-4'>
                                <DetailDescription controlId={"userAddress-1"} label={"Address*"} name="Address" placeholder={"Address"} />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <InputComp required={true} label={"City: *"} type={"text"} placeholder={"City"} controlId={"user-city"} name="" />
                        </Col>

                        <Col lg={4}>
                            <InputComp required={true} label={"State: *"} type={"text"} placeholder={"State"} controlId={"user-state"} name="" />
                        </Col>

                        <Col lg={4}>
                            <div className="user-pin">
                                <InputComp label={`Pincode: *`} type={"number"} placeholder={`Pincode`} controlId={""} name={''} />
                            </div>
                        </Col>
                        <Col lg={12} className='mb-3'>
                            <SimpleAccordian />
                        </Col>
                        <Col lg={12}>
                            <SubmitBtn> <span className='me-2'><IoMdSend size={20} /></span>Submit</SubmitBtn>
                        </Col>

                    </Row>
                </form>

            </div>
        </section>
    )
}

export default AddUser
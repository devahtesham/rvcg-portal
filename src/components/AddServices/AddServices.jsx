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
import { MdSettings } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload"
import { FaShoppingCart } from "react-icons/fa";




const AddServices = () => {
    const { handleModalClose } = useModal()
    return (
        <section>
            <div className="add-user-header d-flex justify-content-between align-items-center shadow-sm py-4 px-3">
                <div className="user-heading d-flex align-items-center gap-2">
                    <span>
                        <FaShoppingCart size={20} color='#0d6efd' />
                    </span>
                    <span className='m-0'>
                        Add OnCall Services
                    </span>
                </div>
                <div className="close-modal" onClick={handleModalClose}>
                    <RxCross2 size={20} color='#0d6efd' />
                </div>
            </div>

            <div className="user-personal-info mt-3">
                <form action="" className='p-3'>
                    <Row>
                        <Col lg={4}>
                            <InputComp required={true} label={"Customer: *"} type={"text"} placeholder={"Customer"} controlId={"add-amc-1"} name="" />
                        </Col>
                        <Col lg={4}>
                            <InputComp required={true} label={"Contact Person: *"} type={"text"} placeholder={"Contact Person"} controlId={"add-amc-2"} name="" />
                        </Col>

                        <Col lg={4}>
                            <div className='amc-date'>
                                <InputComp label="Date: *" type={"date"} placeholder={"Date"} name="" />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <DropDownComp options={['Status', 'Status-1', 'Status-2']} name="" className='p-3 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <DropDownComp options={['Assign To', 'Assign To -1', 'Assign To -2']} name="" className='p-3 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <InputComp required={true} label={"AMC Detail: *"} type={"text"} placeholder={"AMC Detail"} controlId={"add-amc-3"} name="" />
                        </Col>

                        <Col lg={4}>
                            <DropDownComp options={['No of Interval', '1', '2']} name="" className='p-3 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <DropDownComp options={['No of Services', '1', '2']} name="" className='p-3 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <DropDownComp options={['Product', 'product 1', 'product 2']} name="" className='p-3 mb-4' />
                        </Col>

                        <Col lg={4}>
                            <InputComp className="mt-4" required={false} label={"Note"} type={"text"} placeholder={"Note"} controlId={"add-amc-4"} name="" />
                        </Col>

                        <Col lg={12}>
                            <InputComp className="" required={false} label={"Remark"} type={"text"} placeholder={"Remark"} controlId={"add-amc-5"} name="" />
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

export default AddServices
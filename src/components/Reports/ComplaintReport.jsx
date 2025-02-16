import React from 'react'
import { DropDownComp, InputComp } from '../bootstrap'
import { Col, Row } from 'react-bootstrap'
import SubmitBtn from "../SubmitBtn/SubmitBtn"
import { IoMdSend } from "react-icons/io";

const ComplaintReport = () => {
  return (
    <form>
    <Row>
      <Col lg={6}>
        <DropDownComp options={['Customer', 'Customer-1', 'Customer-2']} name="" className='p-3 mb-3' />
      </Col>
      <Col lg={6}>
        <DropDownComp options={['Status', 'Open', 'In Progress', 'Completed']} name="" className='p-3 mb-3' />
      </Col>

      <Col lg={6}>
        <div className='report-start-date'>
          <InputComp label="Start Date: *" type={"date"} placeholder={"Start Date"} name="" />
        </div>
      </Col>
      <Col lg={6}>
        <div className='report-end-date'>
          <InputComp label="End Date: *" type={"date"} placeholder={"Start Date"} name="" />
        </div>
      </Col>
      <Col lg={12}>
        <SubmitBtn> <span className='me-2'><IoMdSend size={20} /></span>Go</SubmitBtn>
      </Col>
    </Row>

    </form>
  )
}

export default ComplaintReport
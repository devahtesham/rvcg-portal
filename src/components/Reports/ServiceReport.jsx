import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { InputComp } from '../bootstrap'
import SubmitBtn from '../SubmitBtn/SubmitBtn'
import { IoMdSend } from 'react-icons/io'

const ServiceReport = () => {
  return (
    <form>
    <Row>
      <Col lg={6}>
        <div className='service-report-start-date'>
          <InputComp label="Start Date: *" type={"date"} placeholder={"Start Date"} name="" />
        </div>
      </Col>
      <Col lg={6}>
        <div className='service-report-end-date'>
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

export default ServiceReport
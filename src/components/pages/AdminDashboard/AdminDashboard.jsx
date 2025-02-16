import React from 'react'
import { MAIN_HEADINGS } from '../../../data'
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import "./AdminDashboard.css"


import AmcServicesDashboard from '../../AmcServicesDashboard/AmcServicesDashboard';
import Statistics from '../../Statistics/Statistics';
import ClosingComplaint from '../../ClosingComplaint/ClosingComplaint';
import ClosingAmcServices from '../../ClosingAmcServices/ClosingAmcServices';
import DashboardCalendar from '../../DashboardCalendar/DashboardCalendar';
import ComplaintSummary from '../../ComplaintSummary/ComplaintSummary';
import SmartSummary from '../../SmartSummary/SmartSummary';


const AdminDashboard = () => {
  const { pathname } = useLocation();
  return (
    <>
      <section className='flex-grow-1'>
        <div className='property-listing-header my-4 px-4 d-flex align-items-center gap-3'>
          <h3 className='m-0'>{MAIN_HEADINGS[pathname]}</h3>
        </div>
        <section className='admin-dashboard px-5'>
          <Row className='justify-content-between'>
            <Col md={6} className=''>
              <Statistics />
            </Col>
            <Col md={6} className='mb-4'>
              <ClosingComplaint />
            </Col>
            <Col md={6} className='mb-4'>
              <ClosingAmcServices />
            </Col>
            <Col md={6} className='mb-4'>
              <DashboardCalendar />
            </Col>
            <Col md={6} className='mb-4'>
              <ComplaintSummary />
            </Col>
            <Col md={6} className='mb-4'>
              <SmartSummary />
            </Col>
          </Row>

          <Row>
            <Col lg={12} className='mb-4'>
              <AmcServicesDashboard />
            </Col>

          </Row>
        </section>
      </section>



    </>

  )
}

export default AdminDashboard
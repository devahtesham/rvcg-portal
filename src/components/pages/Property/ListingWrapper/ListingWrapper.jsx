import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const ListingWrapper = ({children}) => {
  return (
    <Container fluid="xxl" className='mt-xxl-5 mt-4'>
        <Row className="d-flex justify-content-center listing-section">
            <Col md={11}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default ListingWrapper
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UploadDragFileCopy from './UploadDragFile/UploadDragFileCopy'
import MultiImageUpload from './MultiImageUploader/MultiImageUploader'
import MultiImageUploadCopy from './MultiImageUploader/MultiImageUploaderCopy'

const TestComp = () => {
    return (
        <>
            <Row className='bg-lightgray mt-4'>
                <Col xxl={6} className=" p-4">
                    {/* <h5 className='mb-3'>GDPR Agreement</h5> */}
                    {/* <UploadDragFileCopy /> */}
                </Col>
                <Col xxl={6} className=" p-4">
                    <h5 className='mb-3'>Property Images</h5>
                    <MultiImageUploadCopy />
                </Col>
            </Row>
        </>
    )
}

export default TestComp
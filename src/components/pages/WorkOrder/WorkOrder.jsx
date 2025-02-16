import React from 'react'
import { MAIN_HEADINGS } from '../../../data'
import { FaPlus } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal'
import ModalGlobal from '../../MUI/Modal/ModalGlobal'
import { useLocation } from 'react-router-dom'
import IconMenu from '../../MUI/IconMenu/IconMenu'

const WorkOrder = () => {
  const { pathname } = useLocation();
  const columns = [
    {
      name: 'work_order_id',
      label:"WORK ORDER ID",
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            <span>{value}</span>
          </div>
        )
      }
    },
    {
      name: 'work_order_name',
      label:"WORK ORDER NAME",
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            <span>{value}</span>
          </div>
        )
      }
    },
    {
      name: 'priority',
      label:'PRIORITY ',
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    {
      name: 'instructions',
      label:"INSTRUCTIONS",
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    {
      name: 'status',
      label:'STATUS ',
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    

    {
      name: 'action',
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>
            <IconMenu options={["View","Edit","Delete"]} />
          </div>
        ),
        filter:false
      }
    },
  ];

  const data = [
    ["12345678", "Car Checking", "High Priority", "This is a test instructions","Open"],

  ];

  const options = {
    filterType: 'checkbox',
    elevation: 1,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    filterType: "dropdown",
  };
  return (
    <>
      <section className='flex-grow-1'>
        <div className='property-listing-header my-4 px-4 d-flex align-items-center gap-3'>
          <h3 className='m-0'>{MAIN_HEADINGS[pathname]}</h3>
        </div>

        <div className="property-listing-grid mt-5">
          <Row className='justify-content-center'>
            <Col lg={11}>
              {/* <DataGridGlobal rows={rows} columns={columns} pageSize={pageSize} /> */}
              <DataGridGlobal data={data} columns={columns} options={options} />
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default WorkOrder
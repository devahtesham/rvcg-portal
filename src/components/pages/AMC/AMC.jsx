import React from 'react'
import { useLocation } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { FaPlus } from "react-icons/fa6";
import Button from '../../ModalButton/Button';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import { Col, Row } from 'react-bootstrap';
import IconMenu from "../../MUI/IconMenu/IconMenu";
import AddAmc from '../../AddAmc/AddAmc';


const AMC = () => {
  const { pathname } = useLocation();
  const { handleModalOpen } = useModal()   
  
  
  const columns = [
    {
      name: 'customer',
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            <h6 className='m-0 fw-bold'>{value}</h6>
            <span>AMC-12345</span>
          </div>
        )
      }
    },
    {
      name: 'assignTo',
      label:"ASSIGN TO",
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    {
      name: 'productName',
      label:'PRODUCT NAME ',
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    {
      name: 'date',
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
      options: {
        customBodyRender:(value)=>(
          <div className='ms-3'>
            {value}
          </div>
        )
      }
    },
    {
      name: 'employeeStatus',
      label:'EMPLOYEE STATUS ',
      options: {
        customBodyRender:(value)=>(
          <div className='ms-5'>
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
            <IconMenu options={["View"]} />
          </div>
        ),
        filter:false
      }
    },
  ];

  const data = [
    ["Adam William", "Adam William", "Test Product", "03032001","In Progress","Open"],

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
          <Button onClick={handleModalOpen}><FaPlus color='#fff' size={20} /></Button>
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
      <ModalGlobal customStyle={{ paddingLeft: 0, paddingRight: 0 }}>
       <AddAmc />
      </ModalGlobal>
    </>
  )
}

export default AMC